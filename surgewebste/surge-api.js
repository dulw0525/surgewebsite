const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3001;

// 雪花算法实现
class Snowflake {
  constructor() {
    this.workerId = 1n;
    this.datacenterId = 1n;
    this.sequence = 0n;
    this.lastTimestamp = -1n;
    this.sequenceBits = 12n;
    this.workerIdBits = 5n;
    this.datacenterIdBits = 5n;
    this.maxSequence = (1n << this.sequenceBits) - 1n;
    this.workerIdShift = this.sequenceBits;
    this.datacenterIdShift = this.sequenceBits + this.workerIdBits;
    this.timestampLeftShift = this.datacenterIdShift + this.datacenterIdBits;
    this.startTimestamp = 1640995200000n;
  }

  generateTimestamp() {
    return BigInt(Date.now());
  }

  waitForNextMillis(lastTimestamp) {
    let timestamp = this.generateTimestamp();
    while (timestamp <= lastTimestamp) {
      timestamp = this.generateTimestamp();
    }
    return timestamp;
  }

  nextId() {
    let timestamp = this.generateTimestamp();

    if (timestamp < this.lastTimestamp) {
      throw new Error('Clock moved backwards');
    }

    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1n) & this.maxSequence;
      if (this.sequence === 0n) {
        timestamp = this.waitForNextMillis(this.lastTimestamp);
      }
    } else {
      this.sequence = 0n;
    }

    this.lastTimestamp = timestamp;

    const id = ((timestamp - this.startTimestamp) << this.timestampLeftShift) |
               (this.datacenterId << this.datacenterIdShift) |
               (this.workerId << this.workerIdShift) |
               this.sequence;

    return id.toString();
  }
}

const snowflake = new Snowflake();

// Database configuration
const dbConfig = {
  host: '210.16.160.111',
  port: 5455,
  database: 'agent',
  user: 'root',
  password: 'infini_rag_flow',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Email configuration
const emailConfig = {
  host: 'smtp.mxhichina.com',
  port: 465,
  secure: true,
  auth: {
    user: 'insurance@insbean.com',
    pass: 'Infini2024!'
  }
};

const NOTIFY_EMAIL = 'abby_du@insbean.com';

// Create email transporter
const transporter = nodemailer.createTransport(emailConfig);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
async function initDatabase() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id BIGINT UNSIGNED PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(100),
        company VARCHAR(200),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        user_agent TEXT,
        INDEX idx_created_at (created_at),
        INDEX idx_phone (phone)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

// Send email notification
async function sendEmailNotification(data) {
  const mailOptions = {
    from: '"聚流网站留言" <insurance@insbean.com>',
    to: NOTIFY_EMAIL,
    subject: `新留言 - ${data.name} (${data.phone})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #00bc71;">🎉 收到新的网站留言</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>姓名：</strong>${data.name}</p>
          <p><strong>电话：</strong>${data.phone}</p>
          <p><strong>邮箱：</strong>${data.email || '未填写'}</p>
          <p><strong>公司：</strong>${data.company || '未填写'}</p>
          <p><strong>留言内容：</strong></p>
          <div style="background: white; padding: 15px; border-left: 4px solid #00bc71;">
            ${data.message}
          </div>
        </div>
        <p style="color: #666; font-size: 12px;">
          提交时间：${new Date().toLocaleString('zh-CN')}<br>
          IP 地址：${data.ipAddress}<br>
          此邮件由系统自动发送，请勿回复。
        </p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to', NOTIFY_EMAIL);
    return true;
  } catch (error) {
    console.error('Email send error:', error.message);
    return false;
  }
}

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  const { name, phone, email, company, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ error: '必填字段不能为空' });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const snowflakeId = String(snowflake.nextId());

    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0] ||
                     req.headers['x-real-ip'] ||
                     req.socket.remoteAddress ||
                     'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    await connection.query(
      `INSERT INTO contact_submissions (id, name, phone, email, company, message, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [snowflakeId, name, phone, email || null, company || null, message, ipAddress, userAgent]
    );

    // Send email notification (non-blocking)
    sendEmailNotification({ name, phone, email, company, message, ipAddress }).catch(err => {
      console.error('Failed to send email notification:', err);
    });

    res.json({
      success: true,
      message: '提交成功',
    });
  } catch (error) {
    console.error('Contact form submission error:', error.message);
    res.status(500).json({ error: '提交失败，请稍后重试' });
  } finally {
    if (connection) await connection.end();
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Initialize database and start server
initDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`API server running on port ${PORT}`);
    console.log(`Email notifications will be sent to: ${NOTIFY_EMAIL}`);
  });
});
