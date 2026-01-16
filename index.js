const fs = require('fs');
const path = require('path');
const translate = require('@iamtraction/google-translate');

const portfolioData = require('./portfolio.json');

const languages = {
  en: 'English',
  ar: 'Arabic',
  fr: 'French',
  'zh-cn': 'Chinese',
  de: 'German'
};

async function translateText(text, targetLang) {
  if (targetLang === 'en') return text;
  
  try {
    const result = await translate(text, { to: targetLang });
    return result.text;
  } catch (error) {
    console.error(`Translation error for ${targetLang}:`, error.message);
    return text;
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// حذف مجلد الـ output القديم وإنشاء واحد جديد
function cleanOutputDir() {
  const outputDir = path.join(__dirname, 'output');
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
    console.log('🗑️ Cleaned old output folder\n');
  }
  fs.mkdirSync(outputDir);
  console.log('📁 Created fresh output folder\n');
}

// حذف README القديم من الـ root
function cleanRootReadme() {
  const readmePath = path.join(__dirname, 'README.md');
  if (fs.existsSync(readmePath)) {
    fs.unlinkSync(readmePath);
    console.log('🗑️ Cleaned old README.md from root\n');
  }
}

async function generatePortfolioMD(data, lang) {
  const emoji = {
    en: '🇬🇧',
    ar: '🇪🇬',
    fr: '🇫🇷',
    'zh-cn': '🇨🇳',
    de: '🇩🇪'
  };

  let content = '';

  content += `# ${emoji[lang]} ${await translateText(data.header.name, lang)} | ${await translateText(data.header.title, lang)}\n\n`;
  await delay(500);
  
  content += `**✨ ${await translateText(data.header.tagline, lang)}**\n\n`;
  await delay(500);
  
  content += `${await translateText(data.header.description, lang)}\n\n`;
  await delay(500);
  
  content += `---\n\n`;

  content += `## 🚀 ${await translateText('Available for Freelance', lang)}\n\n`;
  await delay(500);
  
  content += `**📞 ${await translateText('Contact', lang)}:** [WhatsApp](${data.contact.whatsapp})\n\n`;
  content += `---\n\n`;

  content += `## 🧠 ${await translateText('Latest Projects', lang)}\n\n`;
  await delay(500);
  
  content += `${await translateText('A selection of my software work that I am proud of:', lang)}\n\n`;
  await delay(500);
  
  content += `### 🎯 ${await translateText('Featured Projects', lang)}\n\n`;
  await delay(500);

  for (const project of data.projects) {
    content += `- **⏱️ ${project.name}** – *${await translateText(project.category, lang)} (${project.year})*\n`;
    await delay(500);
    
    content += `  ${await translateText(project.description, lang)}\n`;
    await delay(500);
    
    content += `  **🛠️ ${await translateText('Technologies', lang)}:** ${project.technologies}\n\n`;
    await delay(500);
  }

  content += `**🔗 ${await translateText('View on GitHub', lang)}:** [github.com](${data.contact.github})\n\n`;
  await delay(500);
  
  content += `---\n\n`;

  content += `## 📜 ${await translateText('Certifications', lang)}\n\n`;
  await delay(500);
  
  content += `${await translateText('Professional credentials include:', lang)}\n\n`;
  await delay(500);

  for (const cert of data.certifications) {
    content += `- 🎓 **${await translateText(cert.name, lang)}** — ${cert.issuer} (${cert.year})\n`;
    await delay(500);
  }

  content += `\n---\n\n`;

  content += `## 🙌 ${await translateText('Volunteering', lang)}\n\n`;
  await delay(500);
  
  content += `${await translateText('Volunteer experience as developer & moderator:', lang)}\n\n`;
  await delay(500);

  for (const vol of data.volunteering) {
    content += `- **👨‍💼 ${await translateText(vol.role, lang)}** (${vol.period})\n`;
    await delay(500);
    
    content += `  ${await translateText(vol.description, lang)}\n\n`;
    await delay(500);
  }

  content += `---\n\n`;

  content += `## 💻 ${await translateText('Skills', lang)}\n\n`;
  await delay(500);

  content += `### 🎨 ${await translateText('Frontend', lang)}\n`;
  await delay(500);
  content += `${data.skills.frontend}\n\n`;

  content += `### ⚙️ ${await translateText('Backend', lang)}\n`;
  await delay(500);
  content += `${data.skills.backend}\n\n`;

  content += `### 🛠️ ${await translateText('Tools & DevOps', lang)}\n`;
  await delay(500);
  content += `${data.skills.tools}\n\n`;

  content += `---\n\n`;

  content += `## 💬 ${await translateText('Testimonials', lang)}\n\n`;
  await delay(500);

  for (const test of data.testimonials) {
    content += `> 💭 *"${await translateText(test.text, lang)}"*\n`;
    await delay(500);
    content += `> — **${test.author}**\n\n`;
  }

  content += `---\n\n`;
  content += `**© 2026 ${data.header.name}. ${await translateText('All rights reserved', lang)}.**\n`;
  await delay(500);

  return content;
}

async function generateReadmeMD(data) {
  let content = `# 🌐 Welcome to My Portfolio\n\n`;
  content += `## 👨‍💻 ${data.header.name}\n`;
  content += `### ${data.header.title}\n\n`;
  content += `**✨ ${data.header.tagline}**\n\n`;
  content += `---\n\n`;

  content += `## 🌍 Choose Your Language\n\n`;
  content += `- 🇬🇧 [**English**](./output/en.md) - View portfolio in English\n`;
  content += `- 🇪🇬 [**العربية**](./output/ar.md) - عرض السيرة الذاتية بالعربية\n`;
  content += `- 🇫🇷 [**Français**](./output/fr.md) - Voir le portfolio en français\n`;
  content += `- 🇨🇳 [**中文**](./output/zh-cn.md) - 查看中文简历\n`;
  content += `- 🇩🇪 [**Deutsch**](./output/de.md) - Vollständiges Portfolio auf Deutsch\n\n`;
  content += `---\n\n`;

  content += `## 📬 Contact Information\n\n`;
  content += `- **📧 Email:** ${data.contact.email}\n`;
  content += `- **💬 WhatsApp:** [Message Me](${data.contact.whatsapp})\n`;
  content += `- **🔗 GitHub:** [${data.contact.github}](${data.contact.github})\n\n`;
  content += `---\n\n`;

  content += `## 🏆 Quick Stats\n\n`;
  content += `- 🎯 **12,000+** Active Users across projects\n`;
  content += `- 💼 **${data.projects.length}+** Major Projects Completed\n`;
  content += `- 🎓 **${data.certifications.length}+** Professional Certifications\n`;
  content += `- ⭐ **Open Source** Contributor\n\n`;
  content += `---\n\n`;

  content += `## 💼 Technical Skills\n\n`;
  content += `### 🎨 Frontend Development\n`;
  content += `${data.skills.frontend}\n\n`;
  content += `### ⚙️ Backend Development\n`;
  content += `${data.skills.backend}\n\n`;
  content += `### 🛠️ Tools & DevOps\n`;
  content += `${data.skills.tools}\n\n`;
  content += `---\n\n`;

  content += `## 📂 Available Portfolio Files\n\n`;
  content += `| Language | File | Description |\n`;
  content += `|----------|------|-------------|\n`;
  content += `| 🇬🇧 English | [en.md](./output/en.md) | Full portfolio in English |\n`;
  content += `| 🇪🇬 Arabic | [ar.md](./output/ar.md) | السيرة الذاتية الكاملة بالعربية |\n`;
  content += `| 🇫🇷 French | [fr.md](./output/fr.md) | Portfolio complet en français |\n`;
  content += `| 🇨🇳 Chinese | [zh-cn.md](./output/zh-cn.md) | 完整的中文简历 |\n`;
  content += `| 🇩🇪 German | [de.md](./output/de.md) | Vollständiges Portfolio auf Deutsch |\n\n`;
  content += `---\n\n`;

  content += `## 📫 Get in Touch\n\n`;
  content += `### 💼 Available for Freelance Work\n\n`;
  content += `**Let's turn your ideas into reality!**\n\n`;
  content += `Contact me on [WhatsApp](${data.contact.whatsapp}) to discuss your project.\n\n`;
  content += `---\n\n`;
  content += `**© 2026 ${data.header.name}. All rights reserved.**\n\n`;
  content += `*Made with ❤️ and ☕*\n`;

  return content;
}

async function main() {
  console.log('🚀 Starting Portfolio Generation...\n');

  try {
    // حذف مجلد output القديم وإنشاء واحد جديد
    cleanOutputDir();
    
    // حذف README القديم من الـ root
    cleanRootReadme();

    const outputDir = path.join(__dirname, 'output');

    // إنشاء ملفات اللغات في مجلد output
    for (const [langCode, langName] of Object.entries(languages)) {
      console.log(`📝 Generating ${langName} portfolio...`);
      const content = await generatePortfolioMD(portfolioData, langCode);
      const filename = path.join(outputDir, `${langCode}.md`);
      fs.writeFileSync(filename, content, 'utf8');
      console.log(`✅ ${langName} portfolio created: output/${langCode}.md\n`);
      await delay(1000);
    }

    // إنشاء README.md في الـ root
    console.log('📝 Generating README.md in root...');
    const readmeContent = await generateReadmeMD(portfolioData);
    const readmePath = path.join(__dirname, 'README.md');
    fs.writeFileSync(readmePath, readmeContent, 'utf8');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
