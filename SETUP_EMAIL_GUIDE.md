# 📧 PANDUAN SETUP EMAIL - CONTACT FORM

Contact form sudah siap! Sekarang tinggal setup EmailJS agar email benar-benar terkirim ke inbox Anda.

## ✅ STEP BY STEP SETUP

### **Step 1: Buat Akun EmailJS**

1. Buka: https://www.emailjs.com/
2. Klik **Sign Up** (gunakan Gmail/GitHub untuk mudah)
3. Verify email Anda
4. Login ke dashboard

---

### **Step 2: Buat Email Service**

1. Di dashboard, pilih **Email Services**
2. Klik **Add New Service**
3. Pilih **Gmail** (atau email provider Anda)
4. Klik **Connect Account**
5. Login dengan akun Gmail Anda (damassdev@gmail.com)
6. Izinkan akses
7. Copy **Service ID** (contoh: `service_abc123`)

---

### **Step 3: Buat Email Template**

1. Di dashboard, pilih **Email Templates**
2. Klik **Create New Template**
3. Beri nama: `template_contact_us`
4. Isi template dengan:

```
Subject: Pesan Baru dari {{from_name}}

---

Nama: {{from_name}}
Email: {{from_email}}
Telepon: {{phone}}
Subject: {{subject}}

Pesan:
{{message}}

---
```

5. Klik **Save**
6. Copy **Template ID**

---

### **Step 4: Dapatkan Public Key**

1. Di dashboard, pilih **API Keys** (atau Account Settings)
2. Copy **Public Key**

---

### **Step 5: Update Contact.tsx**

Buka file: `src/pages/Contact.tsx`

Cari baris:

```tsx
emailjs.init({
  publicKey: "YOUR_PUBLIC_KEY_HERE",
});
```

Ganti dengan:

```tsx
emailjs.init({
  publicKey: "YOUR_PUBLIC_KEY_ANDA",
});
```

Dan cari baris:

```tsx
await emailjs.send(
  "service_contact",
  "template_contact_us",
```

Ganti menjadi:

```tsx
await emailjs.send(
  "service_YOUR_SERVICE_ID",
  "template_contact_us",
```

---

### **Step 6: Test Form**

1. Run: `npm run dev`
2. Buka: http://localhost:5173/contact
3. Isi form dan klik **Kirim Pesan**
4. Cek email damassdev@gmail.com (atau spam folder)
5. ✅ Email harus masuk!

---

## 📝 CHECKLIST

- [ ] Akun EmailJS dibuat
- [ ] Email Service ditambahkan (Gmail)
- [ ] Template dibuat: `template_contact_us`
- [ ] Public Key dicopy
- [ ] Service ID dicopy
- [ ] Contact.tsx diupdate dengan Public Key & Service ID
- [ ] Test form dijalankan
- [ ] Email terkirim ke inbox

---

## 🆘 TROUBLESHOOTING

**"Email tidak terkirim"**

- Cek Public Key dan Service ID sudah benar
- Cek email template sudah benar
- Lihat error di console browser (F12 > Console)

**"Service atau Template tidak ditemukan"**

- Pastikan Service ID dan Template ID sudah benar
- Cek di dashboard EmailJS bahwa service/template sudah tersimpan

**"Permission denied dari Gmail"**

- Login ke Gmail dan izinkan akses EmailJS
- Update service di EmailJS Account

---

## ✨ SELESAI!

Form contact us Anda sekarang fully functional dan email akan masuk ke damassdev@gmail.com! 🎉
