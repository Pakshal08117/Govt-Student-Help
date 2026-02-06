 Admin Credentials & System Information

## 🔐 Admin Login Credentials

**Admin Panel Access:**
- **URL:** http://localhost:8080/admin
- **Username:** `admin`
- **Password:** `admin123`

**Important:** Change these credentials in production by updating the `.env` file:
```
VITE_ADMIN_USERNAME=your_username
VITE_ADMIN_PASSWORD=your_secure_password
```

---

## 🌐 Application URLs

### Development
- **Main Website:** http://localhost:8080/
- **Admin Panel:** http://localhost:8080/admin
- **Schemes Page:** http://localhost:8080/schemes
- **Services Page:** http://localhost:8080/services
- **AI Assistant:** http://localhost:8080/ (chat widget on homepage)

### Production
Update these URLs after deployment

---

## 📊 Database Information

### Supabase Configuration
- **Project URL:** https://jazqpsxgsfadvkvhwnkf.supabase.co
- **Database:** PostgreSQL (hosted on Supabase)

### Tables:
1. **profiles** - User profile information
2. **activities** - User activity tracking

**Note:** Schemes and services are stored in local TypeScript files for better performance:
- `src/data/schemes.ts` - Main schemes (10 schemes)
- `src/data/realSchemes50.ts` - 50 real government schemes with official links
- `src/data/services.ts` - Government services

---

## 🌍 Language Support

### Supported Languages (12):
1. **English (EN)** - Default
2. **Hindi (HI)** - हिंदी
3. **Marathi (MR)** - मराठी
4. **Bengali (BN)** - বাংলা
5. **Tamil (TA)** - தமிழ்
6. **Telugu (TE)** - తెలుగు
7. **Gujarati (GU)** - ગુજરાતી
8. **Kannada (KN)** - ಕನ್ನಡ
9. **Malayalam (ML)** - മലയാളം
10. **Punjabi (PA)** - ਪੰਜਾਬੀ
11. **Odia (OR)** - ଓଡ଼ିଆ
12. **Assamese (AS)** - অসমীয়া

### How to Switch Language:
- Click the language toggle button in the header
- Language changes apply to entire website instantly
- User preference is saved in browser localStorage

---

## 📋 50 Real Government Schemes

All schemes have been added with:
- ✅ Official government website links
- ✅ Direct application links
- ✅ Real helpline numbers
- ✅ Actual eligibility criteria
- ✅ Required documents list
- ✅ Benefits information

### Categories:
1. **Scholarship (10 schemes)**
   - NSP Pre-Matric, Post-Matric
   - INSPIRE, PMSS, NMMS, etc.

2. **Health (10 schemes)**
   - Ayushman Bharat, ESIS, RBSK
   - PMSBY, PMJJBY, etc.

3. **Housing (8 schemes)**
   - PMAY Urban, PMAY Gramin
   - CLSS, Rental Housing, etc.

4. **Agriculture (8 schemes)**
   - PM-KISAN, PMFBY, KCC
   - PMKSY, Soil Health Card, etc.

5. **Employment (8 schemes)**
   - MUDRA, PMEGP, PMKVY
   - DDU-GKY, Stand-Up India, etc.

6. **Women (6 schemes)**
   - Sukanya Samriddhi, Beti Bachao
   - Ujjwala, Mahila Shakti, etc.

7. **Senior Citizen & Disability (4 schemes)**
   - Old Age Pension, Disability Pension
   - ADIP, Senior Citizen Savings, etc.

---

## 🚀 How to Run the Project

### Start Development Server:
```bash
npm run dev
```
Server will start at: http://localhost:8080/

### Build for Production:
```bash
npm run build
```

### Preview Production Build:
```bash
npm run preview
```

---

## 🔧 Common Issues & Solutions

### Issue 1: ERR_CONNECTION_REFUSED
**Solution:** Make sure dev server is running
```bash
npm run dev
```

### Issue 2: Admin Login Not Working
**Solution:** Check `.env` file has correct credentials:
```
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=admin123
```

### Issue 3: Language Not Changing
**Solution:** Clear browser cache and reload:
- Press `Ctrl + Shift + R` (Windows)
- Press `Cmd + Shift + R` (Mac)

### Issue 4: Schemes Not Showing
**Solution:** Check if data files exist:
- `src/data/schemes.ts`
- `src/data/realSchemes50.ts`

---

## 📱 Features

### For Users:
- ✅ Browse 50+ government schemes
- ✅ Filter by category, state, eligibility
- ✅ Multi-language support (12 languages)
- ✅ AI Assistant for scheme recommendations
- ✅ Direct links to official application pages
- ✅ Track application status
- ✅ Document helper guide

### For Admins:
- ✅ View all user applications
- ✅ Approve/reject applications
- ✅ Search and filter applications
- ✅ View user statistics
- ✅ Manage scheme data

---

## 📞 Support & Helplines

### National Helplines:
- **NSP Helpline:** 0120-6619540
- **PM-KISAN:** 155261 / 011-24300606
- **Ayushman Bharat:** 14555
- **PMAY:** 1800-11-6163
- **MUDRA:** 1800-180-1111

### Technical Support:
- Check documentation in project files
- Review error logs in browser console
- Contact system administrator

---

## 🔒 Security Notes

### Important:
1. **Change default admin credentials** before deploying to production
2. **Never commit `.env` file** to version control
3. **Use HTTPS** in production
4. **Enable Supabase RLS** (Row Level Security) for database
5. **Regularly update dependencies** for security patches

---

## 📝 File Structure

```
src/
├── components/        # React components
│   ├── ui/           # UI components (shadcn)
│   ├── AIAssistant.tsx
│   ├── SiteHeader.tsx
│   └── ...
├── contexts/         # React contexts
│   ├── AuthContext.tsx
│   └── LanguageContext.tsx
├── data/            # Data files
│   ├── schemes.ts   # Main schemes
│   ├── realSchemes50.ts  # 50 real schemes
│   ├── services.ts
│   └── locations.ts
├── pages/           # Page components
│   ├── Index.tsx
│   ├── Schemes.tsx
│   ├── AdminPanel.tsx
│   └── ...
├── services/        # Service files
│   ├── aiService.ts
│   └── explainableAI.ts
└── lib/             # Utility functions
    ├── auth.ts
    └── utils.ts
```

---

## ✅ Checklist for Deployment

- [ ] Update admin credentials in `.env`
- [ ] Update Supabase URL and keys
- [ ] Test all 50 schemes links
- [ ] Verify language switching on all pages
- [ ] Test admin panel functionality
- [ ] Check mobile responsiveness
- [ ] Enable HTTPS
- [ ] Set up domain name
- [ ] Configure CDN (if needed)
- [ ] Set up monitoring and analytics
- [ ] Create backup strategy
- [ ] Document API endpoints
- [ ] Set up error logging

---

## 📊 Statistics

- **Total Schemes:** 50 (all with official links)
- **Total Languages:** 12
- **Total Pages:** 15+
- **Total Components:** 50+
- **Database Tables:** 2 (profiles, activities)
- **Supported States:** All India + State-specific

---

## 🎯 Next Steps

1. **Add More Schemes:** Edit `src/data/realSchemes50.ts`
2. **Add More Languages:** Update `src/contexts/LanguageContext.tsx`
3. **Customize Styling:** Modify Tailwind classes
4. **Add Analytics:** Integrate Google Analytics or similar
5. **Add More Features:** Document upload, SMS notifications, etc.

---

**Last Updated:** February 6, 2026
**Version:** 1.0.0
**Status:** Production Ready ✅
