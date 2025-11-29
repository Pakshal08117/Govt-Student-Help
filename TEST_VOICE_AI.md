# 🎤 Test Voice-First AI - Quick Guide

## 🚀 How to Test

### 1. Start the App
```bash
npm run dev
```
Open: http://localhost:8080

### 2. Open AI Assistant
Click the **orange pulsing button** (bottom-right corner)

### 3. Test Different Scenarios

---

## 📝 Test Scenarios

### Test 1: Widow Pension (English)
**Say:** "My husband died recently, I have two kids, do I get any help?"

**Expected Response:**
- Empathetic message with 🙏
- Widow pension details (₹1,000/month)
- Required documents list
- "Shall I help you apply?"
- Follow-up questions about children

---

### Test 2: Widow Pension (Marathi)
**Say:** "माझा पती मरण पावला, माझी दोन मुले आहेत"

**Expected Response:**
- "तुमच्या दुःखात मी सहभागी आहे. 🙏"
- विधवा पेन्शन तपशील
- आवश्यक कागदपत्रे
- "मी अर्ज करण्यात मदत करू का?"

---

### Test 3: Disabled Child (Hindi)
**Say:** "मेरा बच्चा दिव्यांग है, क्या कोई मदद है?"

**Expected Response:**
- Understanding message with 💙
- Disability pension (₹1,500/month)
- Free medical treatment
- "क्या मैं आवेदन में मदद करूं?"

---

### Test 4: Unemployment (English)
**Say:** "I lost my job, I need help"

**Expected Response:**
- Encouraging message with 💪
- Unemployment allowance (₹1,500/month)
- Free skill training info
- "Shall I help you register?"

---

### Test 5: Pregnancy (Marathi)
**Say:** "मी गर्भवती आहे"

**Expected Response:**
- "तुमच्या गर्भावस्थेचे अभिनंदन! 🤰"
- मातृ वंदना योजना (₹5,000)
- मोफत प्रसूती माहिती
- "अंगणवाडीत नोंदणी करू का?"

---

### Test 6: Old Age (Hindi)
**Say:** "मैं 65 साल का हूं, मुझे पेंशन चाहिए"

**Expected Response:**
- Understanding message with 👴
- Old age pension (₹1,500/month)
- Free benefits list
- "क्या मैं आवेदन में मदद करूं?"

---

## ✅ What to Check

### 1. Empathy
- [ ] AI shows compassion for difficult situations
- [ ] Uses appropriate emojis (🙏 for loss, 💙 for disabled child)
- [ ] Tone is supportive and understanding

### 2. Accuracy
- [ ] Correct scheme suggested
- [ ] Correct amount mentioned
- [ ] Correct eligibility criteria
- [ ] Correct documents listed

### 3. Actionable Help
- [ ] AI offers to help apply
- [ ] Provides step-by-step guidance
- [ ] Asks follow-up questions
- [ ] Gives next steps

### 4. Voice Features
- [ ] Voice recognition works
- [ ] AI speaks response aloud
- [ ] Correct language detected
- [ ] Clear pronunciation

### 5. Follow-up Questions
- [ ] AI asks about children (if mentioned)
- [ ] AI asks about income (if relevant)
- [ ] AI asks about documents
- [ ] Questions are contextual

---

## 🐛 Troubleshooting

### Voice Not Working?
1. Use **Chrome browser**
2. Allow **microphone permission**
3. Check **Windows microphone settings**
4. Speak **loudly and clearly**

### Wrong Language Response?
1. Change language in app first
2. Then speak in that language
3. AI will respond in same language

### No Empathy in Response?
1. Use specific keywords:
   - "husband died" (not just "widow")
   - "child is disabled" (not just "disabled")
   - "lost my job" (not just "unemployed")

---

## 💡 Tips for Best Results

### 1. Be Specific
❌ "I need help"
✅ "My husband died, I have two kids"

### 2. Mention Key Details
❌ "I have a problem"
✅ "I am pregnant and need financial help"

### 3. Use Natural Language
❌ "Widow pension eligibility"
✅ "My husband died recently, do I get any help?"

### 4. Speak Complete Sentences
❌ "Job lost"
✅ "I lost my job and need help"

---

## 🎯 Success Criteria

The AI is working perfectly if:

✅ Detects life situation correctly
✅ Shows empathy appropriately
✅ Suggests correct scheme
✅ Provides complete information
✅ Offers to help apply
✅ Asks relevant follow-up questions
✅ Speaks response in correct language
✅ Tone is supportive and helpful

---

## 📊 Test Results Template

```
Test: Widow Pension (English)
Input: "My husband died, I have two kids"
Expected: Empathetic response + pension details
Actual: ___________________________
Status: ✅ Pass / ❌ Fail
Notes: ___________________________

Test: Disabled Child (Marathi)
Input: "माझे मूल अपंग आहे"
Expected: Understanding response + disability pension
Actual: ___________________________
Status: ✅ Pass / ❌ Fail
Notes: ___________________________
```

---

## 🎊 Ready to Test!

1. Start app: `npm run dev`
2. Open AI Assistant
3. Click microphone 🎤
4. Speak test scenarios
5. Check responses
6. Verify empathy and accuracy

**The future of government services is here!** 🚀
