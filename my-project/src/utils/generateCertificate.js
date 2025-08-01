import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import logo from '../assets/skillswap_logo.png'; // Make sure this is a PNG or base64 string

export const generateCertificate = async ({ name, skill, date, type = 'learner', skills = [] }) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([841.89, 595.28]); // A4 Landscape size
  const { width, height } = page.getSize();

  // Use a cleaner, more modern font
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Define a color palette
  const colors = {
    primary: rgb(0.12, 0.23, 0.44), // Deep Navy Blue
    secondary: rgb(0.22, 0.45, 0.70), // Brighter Blue
    text: rgb(0.2, 0.2, 0.2), // Dark Gray
    lightText: rgb(0.5, 0.5, 0.5), // Lighter Gray
    seal: rgb(0.12, 0.23, 0.44),
  };

  // --- 1. Draw a Decorative Border ---
  const borderWidth = 15;
  page.drawRectangle({
    x: borderWidth,
    y: borderWidth,
    width: width - borderWidth * 2,
    height: height - borderWidth * 2,
    borderColor: colors.primary,
    borderWidth: 2,
  });

  // --- 2. Add Header with Logo ---
  try {
    const logoBytes = await fetch(logo).then((res) => res.arrayBuffer());
    const logoImg = await pdfDoc.embedPng(logoBytes);
    const logoDims = logoImg.scale(0.25); // Scale down the logo for the header

    page.drawImage(logoImg, {
      x: (width - logoDims.width) / 2,
      y: height - 80,
      width: logoDims.width,
      height: logoDims.height,
    });
  } catch (err) {
    console.error('Logo failed to load:', err);
  }

  // --- 3. Main Content ---
  // Helper function to draw centered text
  const drawTextCentered = (text, font, size, y, color) => {
    const textWidth = font.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: (width - textWidth) / 2,
      y,
      font,
      size,
      color,
    });
  };

  const mainTitle = type === 'tutor' ? 'Verified Tutor Certificate' : 'Certificate of Achievement';
  drawTextCentered(mainTitle, helveticaBold, 34, height - 140, colors.primary);

  page.drawLine({
    start: { x: 200, y: height - 155 },
    end: { x: width - 200, y: height - 155 },
    thickness: 1,
    color: colors.secondary,
  });

  drawTextCentered('This certificate is proudly presented to', helvetica, 15, height - 190, colors.lightText);

  // Recipient's Name - make it stand out
  drawTextCentered(name, helveticaBold, 48, height - 250, colors.secondary);

  if (type === 'learner') {
    drawTextCentered('For successfully demonstrating proficiency in', helvetica, 15, height - 290, colors.lightText);
    drawTextCentered(skill, helveticaBold, 24, height - 325, colors.text);
  } else if (type === 'tutor') {
    drawTextCentered('For being recognized as a Verified Tutor with expertise in:', helvetica, 15, height - 290, colors.lightText);
    
    // List tutor skills
    let startY = height - 325;
    skills.forEach((s, i) => {
        drawTextCentered(`• ${s} •`, helveticaBold, 16, startY - i * 25, colors.text);
    });
  }

  // --- 4. Footer with Signatures and Seal ---
  const footerY = 100;
  
  // Date
  page.drawText(`Issued on: ${date}`, {
    x: 75,
    y: footerY,
    font: helvetica,
    size: 12,
    color: colors.lightText,
  });

  // Signature Line
  page.drawLine({
    start: { x: width - 275, y: footerY - 2 },
    end: { x: width - 75, y: footerY - 2 },
    thickness: 1,
    color: colors.text,
  });
  page.drawText('Project Lead, SkillSwap', {
    x: width - 255,
    y: footerY - 18,
    font: helvetica,
    size: 12,
    color: colors.lightText,
  });

  // --- 5. Add an "Official Seal" ---
  const sealSize = 45;
  page.drawCircle({
    x: width / 2,
    y: footerY + 15,
    size: sealSize,
    color: colors.seal,
    borderWidth: 2,
    borderColor: colors.primary,
  });
  
  // Text inside the seal
  const sealFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  page.drawText('VERIFIED', {
    x: width/2 - sealFont.widthOfTextAtSize('VERIFIED', 10)/2,
    y: footerY + 20,
    font: sealFont,
    size: 10,
    color: rgb(1, 1, 1),
  });
  page.drawText('SKILLSWAP', {
    x: width/2 - sealFont.widthOfTextAtSize('SKILLSWAP', 8)/2,
    y: footerY + 8,
    font: sealFont,
    size: 8,
    color: rgb(1, 1, 1),
  });


  // --- 6. Save and Download ---
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${name.replace(/\s/g, '_')}_${type}_SkillSwap_Certificate.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};