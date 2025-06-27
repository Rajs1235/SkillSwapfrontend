import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import logo from '../assets/skillswap_logo.png'; // Make sure this is a PNG or base64 string

export const generateCertificate = async ({ name, skill, date, type = 'learner', skills = [] }) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([800, 600]);
  const { width, height } = page.getSize();

  const boldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const normalFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  // Add background logo as watermark
  try {
    const logoBytes = await fetch(logo).then((res) => res.arrayBuffer());
    const logoImg = await pdfDoc.embedPng(logoBytes);

    const logoDims = logoImg.scale(1); // Use original size to determine ratio

    const logoWidth = width * 0.8;
    const logoHeight = (logoDims.height / logoDims.width) * logoWidth;

    page.drawImage(logoImg, {
      x: (width - logoWidth) / 2,
      y: (height - logoHeight) / 2,
      width: logoWidth,
      height: logoHeight,
      opacity: 0.1, // ✅ Light watermark
    });
  } catch (err) {
    console.error('Logo watermark failed to load:', err);
  }

  // Title
  const title = type === 'tutor' ? 'Verified Tutor Certificate' : 'Certificate of Completion';
  page.drawText(title, {
    x: 200,
    y: 500,
    size: 28,
    font: boldFont,
    color: rgb(0.1, 0.2, 0.5),
  });

  // Recipient
  page.drawText('This is proudly awarded to', {
    x: 260,
    y: 440,
    size: 14,
    font: normalFont,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText(name, {
    x: 240,
    y: 410,
    size: 24,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  if (type === 'learner') {
    page.drawText('For successfully completing:', {
      x: 270,
      y: 370,
      size: 14,
      font: normalFont,
      color: rgb(0.2, 0.2, 0.2),
    });

    page.drawText(`SkillSwap Skill Builder: ${skill}`, {
      x: 230,
      y: 340,
      size: 16,
      font: boldFont,
      color: rgb(0.1, 0.4, 0.6),
    });
  } else if (type === 'tutor') {
    page.drawText('Certified as a Verified Tutor at SkillSwap', {
      x: 200,
      y: 370,
      size: 14,
      font: normalFont,
      color: rgb(0.2, 0.2, 0.2),
    });

    page.drawText('Eligible to teach the following skills:', {
      x: 230,
      y: 340,
      size: 12,
      font: normalFont,
      color: rgb(0.2, 0.2, 0.2),
    });

    skills.forEach((s, i) => {
      page.drawText(`- ${s}`, {
        x: 250,
        y: 320 - i * 20,
        size: 12,
        font: normalFont,
        color: rgb(0.1, 0.1, 0.1),
      });
    });
  }

  // Date and signature
  page.drawText(`Date: ${date}`, {
    x: 50,
    y: 80,
    size: 12,
    font: normalFont,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText('__________________________', {
    x: 500,
    y: 100,
    size: 12,
    font: normalFont,
    color: rgb(0.2, 0.2, 0.2),
  });

  page.drawText('Project Lead, SkillSwap', {
    x: 520,
    y: 80,
    size: 10,
    font: normalFont,
    color: rgb(0.2, 0.2, 0.2),
  });

  // Save and download
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${name.replace(/\s/g, '_')}_${type}_SkillSwap_Certificate.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
