# โปรเจกต์ล็อกอินตัวอย่างโดยใช้ (React, Node, Postgres)

---

## Overview สั้น ๆ

โปรเจกต์นี้คือ Full-Stack Web App ที่ทำระบบ **ล็อกอิน/สมัครสมาชิก** และการทำให้โปรเจกต์รัน ด้วย **Docker Compose**

คุณจะได้ทั้งหน้าจอ Login(React) และ API หลังบ้านที่พร้อมใช้งาน (Node.js/Express)

## ด้านความปลอดภัย (Security )

1.  **รหัสผ่านไม่รั่ว (Bcrypt Hashing):**

    - เราใช้ไลบรารี **`bcrypt`** ในฝั่ง Node.js เพื่อแฮชและใส่ Salt ให้กับรหัสผ่านของผู้ใช้ก่อนบันทึกลงใน PostgreSQL
    - **จุดเด่น:** รหัสผ่านจริงจะไม่มีทางถูกเปิดเผย แม้ว่าจะมีคนเข้าถึงฐานข้อมูลได้ก็ตาม

2.  **Session (JWT Token):**
    - ใช้ **JWT (JSON Web Token)** ในการจัดการเซสชัน
    - เมื่อล็อกอินสำเร็จ Back-end จะออก JWT ให้ Front-end ใช้โทเค็นนี้ในการพิสูจน์ตัวตนเพื่อเข้าถึง API ที่ต้องมีการตรวจสอบสิทธิ์ (Protected Routes)

## เทคโนโลยี (The Stack)

| ส่วน                  | เทคโนโลยี             | บทบาท                                   |
| :-------------------- | :-------------------- | :-------------------------------------- |
| **หน้าบ้าน (Client)** | **React**             | ทำ UI ของหน้า Login, Register           |
| **หลังบ้าน (Server)** | **Node.js (Express)** | จัดการ API, Logic การแฮช, และการออก JWT |
| **ฐานข้อมูล (DB)**    | **PostgreSQL**        | ฐานข้อมูลที่ทนทานสำหรับเก็บข้อมูลผู้ใช้ |

## วิธีรันง่าย ๆ ด้วย Docker Compose

ลืมการวุ่นวายกับการติดตั้ง Dependencies หรือการเซ็ต Environment ต่าง ๆ ไปได้เลย! แค่มี Docker ก็พอ

```bash
git clone https://github.com/banana82orange/simple-login-web
cd simple-login-web
docker compose up --build

```

TIP: ถ้าต้องการรันแบบ Background (ไม่ให้ Terminal ค้าง) ให้เพิ่ม -d ต่อท้าย: docker compose up -d --build

## วิธีหยุด Services

```bash
docker compose down
```
