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

function cleanOldFiles() {
  const rootFiles = ['en.md', 'ar.md', 'fr.md', 'zh-cn.md', 'de.md', 'README.md'];
  
  rootFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
  
  console.log('🗑️ Cleaned old files from root\n');
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
  content += `<div align="center">\n\n`;
  content += `## 👨‍💻 ${data.header.name}\n`;
  content += `### ${data.header.title}\n\n`;
  content += `**✨ ${data.header.tagline}**\n\n`;
  content += `[![GitHub](https://img.shields.io/badge/GitHub-Portfolio-black?style=for-the-badge&logo=github)](${data.contact.github})\n`;
  content += `[![WhatsApp](https://img.shields.io/badge/WhatsApp-Contact-25D366?style=for-the-badge&logo=whatsapp)](${data.contact.whatsapp})\n\n`;
  content += `</div>\n\n`;
  content += `---\n\n`;

  content += `## 🌍 Choose Your Language\n\n`;
  content += `<div align="center">\n\n`;
  content += `| Language | النسخة | Langue | 语言 | Sprache |\n`;
  content += `|:--------:|:------:|:------:|:----:|:-------:|\n`;
  content += `| 🇬🇧 [**English**](./en.md) | 🇪🇬 [**العربية**](./ar.md) | 🇫🇷 [**Français**](./fr.md) | 🇨🇳 [**中文**](./zh-cn.md) | 🇩🇪 [**Deutsch**](./de.md) |\n\n`;
  content += `</div>\n\n`;
  content += `---\n\n`;

  content += `## 🚀 Quick Access\n\n`;
  content += `<table align="center">\n`;
  content += `<tr>\n`;
  content += `<td align="center" width="50%">\n\n`;
  content += `### 📬 Contact Information\n\n`;
  content += `- 📧 **Email:** ${data.contact.email}\n`;
  content += `- 💬 **WhatsApp:** [Message Me](${data.contact.whatsapp})\n`;
  content += `- 🔗 **GitHub:** [View Profile](${data.contact.github})\n\n`;
  content += `</td>\n`;
  content += `<td align="center" width="50%">\n\n`;
  content += `### 🏆 Quick Stats\n\n`;
  content += `- 🎯 **12,000+** Active Users\n`;
  content += `- 💼 **${data.projects.length}+** Projects Completed\n`;
  content += `- 🎓 **${data.certifications.length}+** Certifications\n\n`;
  content += `</td>\n`;
  content += `</tr>\n`;
  content += `</table>\n\n`;
  content += `---\n\n`;

  content += `## 💼 Technical Skills\n\n`;
  content += `<details open>\n`;
  content += `<summary><b>🎨 Frontend Development</b></summary>\n\n`;
  content += `\`\`\`\n${data.skills.frontend}\n\`\`\`\n\n`;
  content += `</details>\n\n`;
  
  content += `<details>\n`;
  content += `<summary><b>⚙️ Backend Development</b></summary>\n\n`;
  content += `\`\`\`\n${data.skills.backend}\n\`\`\`\n\n`;
  content += `</details>\n\n`;
  
  content += `<details>\n`;
  content += `<summary><b>🛠️ Tools & DevOps</b></summary>\n\n`;
  content += `\`\`\`\n${data.skills.tools}\n\`\`\`\n\n`;
  content += `</details>\n\n`;
  content += `---\n\n`;

  content += `## 📂 Portfolio Files\n\n`;
  content += `<div align="center">\n\n`;
  content += `| 🌐 Language | 📄 File | 📝 Description |\n`;
  content += `|------------|---------|----------------|\n`;
  content += `| 🇬🇧 English | [\`en.md\`](./en.md) | Full portfolio in English |\n`;
  content += `| 🇪🇬 Arabic | [\`ar.md\`](./ar.md) | السيرة الذاتية الكاملة بالعربية |\n`;
  content += `| 🇫🇷 French | [\`fr.md\`](./fr.md) | Portfolio complet en français |\n`;
  content += `| 🇨🇳 Chinese | [\`zh-cn.md\`](./zh-cn.md) | 完整的中文简历 |\n`;
  content += `| 🇩🇪 German | [\`de.md\`](./de.md) | Vollständiges Portfolio auf Deutsch |\n\n`;
  content += `</div>\n\n`;
  content += `---\n\n`;

  content += `## 📫 Get in Touch\n\n`;
  content += `<div align="center">\n\n`;
  content += `### 💼 Available for Freelance Work\n\n`;
  content += `**Let's turn your ideas into reality!**\n\n`;
  content += `[![Contact on WhatsApp](https://img.shields.io/badge/Contact_on-WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](${data.contact.whatsapp})\n\n`;
  content += `</div>\n\n`;
  content += `---\n\n`;
  content += `<div align="center">\n\n`;
  content += `**© 2026 ${data.header.name}. All rights reserved.**\n\n`;
  content += `*Made with ❤️ and ☕*\n\n`;
  content += `</div>\n`;

  return content;
}

async function main() {
  console.log('🚀 Starting Portfolio Generation...\n');

  try {
    cleanOldFiles();

    for (const [langCode, langName] of Object.entries(languages)) {
      console.log(`📝 Generating ${langName} portfolio...`);
      const content = await generatePortfolioMD(portfolioData, langCode);
      const filename = path.join(__dirname, `${langCode}.md`);
      fs.writeFileSync(filename, content, 'utf8');
      console.log(`✅ ${langName} portfolio created: ${langCode}.md\n`);
      await delay(1000);
    }

    console.log('📝 Generating README.md (Home Screen)...');
    const readmeContent = await generateReadmeMD(portfolioData);
    const readmePath = path.join(__dirname, 'README.md');
    fs.writeFileSync(readmePath, readmeContent, 'utf8');
    console.log(`✅ README.md created: README.md\n`);

    console.log('🎉 All files generated successfully!');
    console.log(`📂 Files created in root directory:`);
    console.log(`   - README.md (Home page)`);
    console.log(`   - en.md (English)`);
    console.log(`   - ar.md (Arabic)`);
    console.log(`   - fr.md (French)`);
    console.log(`   - zh-cn.md (Chinese)`);
    console.log(`   - de.md (German)`);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();