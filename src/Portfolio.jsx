import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=JetBrains+Mono:wght@300;400;500;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  :root {
    --cream: #F8F5F0;
    --warm-white: #FEFCF9;
    --charcoal: #1A1A1A;
    --mid-gray: #6B6B6B;
    --light-gray: #E8E4DF;
    --accent: #C8956C;
    --accent-light: #E8C4A8;
    --accent-dark: #8B5A3C;
    --terminal-bg: #0D1117;
    --terminal-green: #56D364;
    --terminal-blue: #79C0FF;
    --terminal-yellow: #E3B341;
    --terminal-red: #F85149;
    --terminal-purple: #BC8CFF;
    --border: rgba(26,26,26,0.12);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--warm-white);
    color: var(--charcoal);
    overflow-x: hidden;
  }

  .font-display { font-family: 'Playfair Display', serif; }
  .font-mono { font-family: 'JetBrains Mono', monospace; }
  .font-sans { font-family: 'DM Sans', sans-serif; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 20px 60px;
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(254,252,249,0.9);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px; font-weight: 500;
    color: var(--charcoal);
    letter-spacing: 0.02em;
  }
  .nav-logo span { color: var(--accent); }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 400;
    color: var(--mid-gray);
    text-decoration: none;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--charcoal); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding-top: 80px;
    position: relative;
    overflow: hidden;
  }
  .hero-left {
    display: flex; flex-direction: column; justify-content: center;
    padding: 80px 60px 80px 80px;
    position: relative; z-index: 2;
  }
  .hero-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; font-weight: 400;
    color: var(--accent);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 24px;
    display: flex; align-items: center; gap: 10px;
  }
  .hero-tag::before {
    content: ''; width: 32px; height: 1px;
    background: var(--accent);
  }
  .hero-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(52px, 7vw, 88px);
    font-weight: 900;
    line-height: 0.95;
    letter-spacing: -0.02em;
    color: var(--charcoal);
    margin-bottom: 6px;
  }
  .hero-name .italic { font-style: italic; color: var(--accent); }

  /* HERO NAME + PHOTO ROW */
  .hero-name-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;
    margin-bottom: 6px;
    width: 100%;
  }
  .hero-photo-frame {
    position: relative;
    flex-shrink: 0;
    width: 140px;
    height: 168px;
    margin-bottom: 4px;
  }
  /* Layered decorative border */
  .hero-photo-frame::before {
    content: '';
    position: absolute;
    inset: -10px;
    border: 1px solid var(--accent);
    opacity: 0.35;
    z-index: 0;
  }
  .hero-photo-frame::after {
    content: '';
    position: absolute;
    inset: -20px;
    border: 1px solid var(--accent);
    opacity: 0.13;
    z-index: 0;
  }
  .hero-photo-inner {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 1;
    background: var(--light-gray);
  }
  /* Warm duotone overlay on photo */
  .hero-photo-inner::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      160deg,
      rgba(200,149,108,0.18) 0%,
      rgba(26,26,26,0.08) 60%,
      rgba(139,90,60,0.22) 100%
    );
    mix-blend-mode: multiply;
    z-index: 2;
  }
  .hero-photo-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    filter: grayscale(18%) contrast(1.05);
    display: block;
  }
  /* Placeholder shown when no real photo */
  .hero-photo-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--light-gray) 0%, var(--cream) 100%);
    position: relative;
    overflow: hidden;
  }
  .hero-photo-placeholder::before {
    content: '';
    position: absolute;
    bottom: -30px; left: -30px;
    width: 160px; height: 160px;
    border-radius: 50%;
    background: rgba(200,149,108,0.12);
  }
  .hero-photo-placeholder::after {
    content: '';
    position: absolute;
    top: -20px; right: -20px;
    width: 100px; height: 100px;
    border-radius: 50%;
    background: rgba(200,149,108,0.07);
  }
  .hero-photo-placeholder-icon {
    font-size: 48px;
    line-height: 1;
    position: relative; z-index: 1;
    margin-bottom: 10px;
    opacity: 0.55;
  }
  .hero-photo-placeholder-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: var(--accent);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    position: relative; z-index: 1;
    opacity: 0.8;
  }
  /* Corner accent marks */
  .hero-photo-corner {
    position: absolute;
    width: 14px; height: 14px;
    z-index: 3;
  }
  .hero-photo-corner.tl { top: -1px; left: -1px; border-top: 2px solid var(--accent); border-left: 2px solid var(--accent); }
  .hero-photo-corner.tr { top: -1px; right: -1px; border-top: 2px solid var(--accent); border-right: 2px solid var(--accent); }
  .hero-photo-corner.bl { bottom: -1px; left: -1px; border-bottom: 2px solid var(--accent); border-left: 2px solid var(--accent); }
  .hero-photo-corner.br { bottom: -1px; right: -1px; border-bottom: 2px solid var(--accent); border-right: 2px solid var(--accent); }
  /* Floating status badge */
  .hero-photo-status {
    position: absolute;
    bottom: -12px; right: -12px;
    width: 32px; height: 32px;
    background: var(--warm-white);
    border: 1px solid var(--border);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px;
    z-index: 4;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(18px, 2.5vw, 28px);
    font-weight: 400;
    font-style: italic;
    color: var(--mid-gray);
    margin-bottom: 36px;
  }
  .hero-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 16px; font-weight: 300;
    color: var(--mid-gray);
    line-height: 1.7;
    max-width: 420px;
    margin-bottom: 48px;
  }
  .hero-cta {
    display: flex; gap: 16px; align-items: center;
  }
  .btn-primary {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px; font-weight: 500;
    padding: 14px 32px;
    background: var(--charcoal);
    color: var(--cream);
    border: none; cursor: pointer;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: background 0.2s;
  }
  .btn-primary:hover { background: var(--accent-dark); }
  .btn-ghost {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px; font-weight: 400;
    padding: 14px 32px;
    background: transparent;
    color: var(--charcoal);
    border: 1px solid var(--border);
    cursor: pointer;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    transition: border-color 0.2s;
  }
  .btn-ghost:hover { border-color: var(--charcoal); }

  .hero-right {
    display: flex; align-items: center; justify-content: center;
    padding: 80px 80px 80px 40px;
    position: relative;
  }
  .terminal-window {
    width: 100%; max-width: 480px;
    background: var(--terminal-bg);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.06);
    position: relative;
  }
  .terminal-bar {
    padding: 14px 18px;
    background: #161B22;
    display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .t-dot { width: 12px; height: 12px; border-radius: 50%; }
  .t-red { background: #FF5F57; }
  .t-yellow { background: #FEBC2E; }
  .t-green { background: #28C840; }
  .terminal-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; color: #6B6B8A;
    margin-left: 8px;
    flex: 1; text-align: center;
  }
  .terminal-body {
    padding: 24px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    line-height: 1.8;
    min-height: 340px;
  }
  .t-comment { color: #6B6B8A; }
  .t-green-t { color: var(--terminal-green); }
  .t-blue { color: var(--terminal-blue); }
  .t-yellow-t { color: var(--terminal-yellow); }
  .t-red-t { color: var(--terminal-red); }
  .t-purple { color: var(--terminal-purple); }
  .t-white { color: #E6EDF3; }
  .t-prompt { color: var(--terminal-green); }
  .cursor {
    display: inline-block; width: 8px; height: 14px;
    background: var(--terminal-green);
    animation: blink 1s step-end infinite;
    vertical-align: text-bottom; margin-left: 2px;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  .hero-bg-decor {
    position: absolute; top: 0; right: 0; bottom: 0;
    width: 55%; background: var(--cream);
    z-index: 1;
  }
  .hero-line {
    position: absolute; top: 50%; left: 0; right: 0;
    height: 1px; background: var(--border); z-index: 0;
  }
  .hero-scroll {
    position: absolute; bottom: 40px; left: 80px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; color: var(--mid-gray);
    letter-spacing: 0.1em; text-transform: uppercase;
    display: flex; align-items: center; gap: 12px;
    z-index: 3;
  }
  .hero-scroll::after {
    content: ''; display: block; width: 60px; height: 1px;
    background: var(--mid-gray);
    animation: scrollLine 2s ease-in-out infinite;
  }
  @keyframes scrollLine { 0%,100%{width:60px} 50%{width:90px} }

  /* SECTION COMMON */
  section { padding: 100px 80px; }
  .section-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; font-weight: 400;
    color: var(--accent);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(32px, 4vw, 52px);
    font-weight: 900;
    line-height: 1.1;
    color: var(--charcoal);
    margin-bottom: 60px;
  }
  .section-title .accent { color: var(--accent); font-style: italic; }
  .divider {
    width: 40px; height: 2px;
    background: var(--accent);
    margin: 20px 0 48px;
  }

  /* ABOUT */
  #about { background: var(--cream); }
  .about-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: start;
  }
  .about-left {}
  .about-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 16px; font-weight: 300;
    line-height: 1.85;
    color: var(--mid-gray);
    margin-bottom: 28px;
  }
  .about-text strong { color: var(--charcoal); font-weight: 500; }
  .about-quote {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-style: italic;
    color: var(--charcoal);
    line-height: 1.5;
    border-left: 3px solid var(--accent);
    padding-left: 24px;
    margin: 36px 0;
  }
  .about-right {}
  .fun-card {
    background: var(--terminal-bg);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 24px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }
  .fun-card-header {
    background: #161B22;
    padding: 12px 18px;
    display: flex; align-items: center; gap: 8px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .fun-card-body {
    padding: 20px 24px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; line-height: 2;
  }
  .stat-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 16px; margin-top: 24px;
  }
  .stat-box {
    background: var(--warm-white);
    padding: 24px;
    border: 1px solid var(--border);
  }
  .stat-number {
    font-family: 'Playfair Display', serif;
    font-size: 42px; font-weight: 900;
    color: var(--charcoal);
    line-height: 1;
  }
  .stat-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; color: var(--mid-gray);
    text-transform: uppercase; letter-spacing: 0.08em;
    margin-top: 6px;
  }

  /* SOFT SKILLS */
  #soft-skills { background: var(--warm-white); }
  .skills-orbit {
    display: flex; flex-wrap: wrap;
    gap: 16px; max-width: 900px;
  }
  .skill-pill {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 400;
    padding: 12px 24px;
    border: 1px solid var(--border);
    color: var(--charcoal);
    background: transparent;
    cursor: default;
    transition: border-color 0.2s, background 0.2s;
    display: flex; align-items: center; gap: 10px;
  }
  .skill-pill:hover {
    border-color: var(--accent);
    background: rgba(200,149,108,0.06);
  }
  .skill-pill .emoji { font-size: 16px; }
  .soft-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 2px; margin-top: 60px;
    background: var(--border);
  }
  .soft-item {
    background: var(--warm-white);
    padding: 36px 32px;
    transition: background 0.2s;
  }
  .soft-item:hover { background: var(--cream); }
  .soft-icon { font-size: 28px; margin-bottom: 16px; }
  .soft-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 700;
    color: var(--charcoal); margin-bottom: 8px;
  }
  .soft-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 300;
    color: var(--mid-gray); line-height: 1.6;
  }

  /* TECH SKILLS */
  #tech-skills { background: var(--terminal-bg); color: var(--cream); }
  #tech-skills .section-title { color: #E6EDF3; }
  #tech-skills .section-tag { color: var(--terminal-green); }
  #tech-skills .divider { background: var(--terminal-green); }
  .tech-grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
  .tech-category {
    background: #161B22;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px;
    padding: 28px;
  }
  .tech-cat-header {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .tech-cat-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px; font-weight: 500;
    color: var(--terminal-green);
  }
  .tech-cat-icon { font-size: 20px; }
  .tech-items { display: flex; flex-wrap: wrap; gap: 10px; }
  .tech-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; font-weight: 400;
    padding: 6px 14px;
    border-radius: 3px;
    color: #E6EDF3;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    transition: border-color 0.2s;
  }
  .tech-badge:hover { border-color: var(--terminal-blue); color: var(--terminal-blue); }
  .skill-bar-wrap { margin-top: 24px; }
  .skill-bar-item { margin-bottom: 14px; }
  .skill-bar-label {
    display: flex; justify-content: space-between;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; color: #6B8A6B;
    margin-bottom: 6px;
  }
  .skill-bar-track {
    height: 3px; background: rgba(255,255,255,0.08); border-radius: 2px;
    overflow: hidden;
  }
  .skill-bar-fill {
    height: 100%; border-radius: 2px;
    background: linear-gradient(90deg, var(--terminal-green), var(--terminal-blue));
    transition: width 1.5s cubic-bezier(0.4,0,0.2,1);
  }

  /* EDUCATION */
  #education { background: var(--cream); }
  .edu-timeline { position: relative; padding-left: 32px; }
  .edu-timeline::before {
    content: ''; position: absolute; left: 0; top: 8px; bottom: 0;
    width: 1px; background: var(--border);
  }
  .edu-item { position: relative; margin-bottom: 56px; }
  .edu-dot {
    position: absolute; left: -38px; top: 6px;
    width: 12px; height: 12px; border-radius: 50%;
    background: var(--accent);
    border: 2px solid var(--cream);
    box-shadow: 0 0 0 2px var(--accent);
  }
  .edu-year {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; font-weight: 400;
    color: var(--accent);
    letter-spacing: 0.1em;
    margin-bottom: 8px;
  }
  .edu-degree {
    font-family: 'Playfair Display', serif;
    font-size: 22px; font-weight: 700;
    color: var(--charcoal); margin-bottom: 4px;
  }
  .edu-school {
    font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 400;
    color: var(--mid-gray); margin-bottom: 12px;
  }
  .edu-detail {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 300;
    color: var(--mid-gray); line-height: 1.6;
  }
  .edu-badge {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; padding: 4px 10px;
    background: rgba(200,149,108,0.12);
    color: var(--accent);
    border: 1px solid rgba(200,149,108,0.3);
    margin-top: 10px; margin-right: 6px;
    border-radius: 2px;
  }

  /* PROJECTS */
  #projects { background: var(--warm-white); }
  .projects-grid {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    background: var(--border);
  }
  .project-card {
    background: var(--warm-white);
    padding: 36px 32px;
    position: relative; overflow: hidden;
    cursor: default;
    transition: background 0.25s;
  }
  .project-card:hover { background: var(--cream); }
  .project-card::before {
    content: attr(data-num);
    position: absolute; right: 24px; top: 20px;
    font-family: 'Playfair Display', serif;
    font-size: 64px; font-weight: 900;
    color: rgba(26,26,26,0.04);
    line-height: 1;
    pointer-events: none;
  }
  .project-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px; }
  .project-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; padding: 3px 9px;
    background: var(--light-gray);
    color: var(--mid-gray); border-radius: 2px;
  }
  .project-name {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 700;
    color: var(--charcoal); margin-bottom: 12px;
  }
  .project-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 300;
    color: var(--mid-gray); line-height: 1.65;
    margin-bottom: 24px;
  }
  .project-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px; font-weight: 500;
    color: var(--accent);
    text-decoration: none;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    display: flex; align-items: center; gap: 8px;
  }
  .project-link::after { content: '→'; transition: transform 0.2s; }
  .project-link:hover::after { transform: translateX(4px); }

  /* ACHIEVEMENTS */
  #achievements { background: var(--charcoal); }
  #achievements .section-title { color: var(--cream); }
  #achievements .section-tag { color: var(--accent-light); }
  #achievements .divider { background: var(--accent); }
  .achievements-list { display: flex; flex-direction: column; gap: 0; }
  .achievement-row {
    display: grid; grid-template-columns: 80px 1fr auto;
    align-items: center; gap: 32px;
    padding: 28px 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    transition: background 0.2s;
  }
  .achievement-row:first-child { border-top: 1px solid rgba(255,255,255,0.08); }
  .achievement-icon { font-size: 32px; text-align: center; }
  .achievement-info {}
  .achievement-title {
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 700;
    color: var(--cream); margin-bottom: 4px;
  }
  .achievement-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 300;
    color: rgba(255,255,255,0.45);
  }
  .achievement-year {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px; color: var(--accent-light);
    white-space: nowrap;
  }

  /* EXTRACURRICULAR */
  #extracurricular { background: var(--cream); }
  .extra-grid {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;
  }
  .extra-card {
    display: flex; gap: 20px;
    padding: 28px;
    border: 1px solid var(--border);
    background: var(--warm-white);
    transition: border-color 0.2s;
  }
  .extra-card:hover { border-color: var(--accent); }
  .extra-emoji { font-size: 32px; flex-shrink: 0; margin-top: 2px; }
  .extra-name {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 700;
    color: var(--charcoal); margin-bottom: 6px;
  }
  .extra-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 300;
    color: var(--mid-gray); line-height: 1.6;
  }

  /* CONTACT */
  #contact { background: var(--warm-white); }
  .contact-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start;
  }
  .contact-left {}
  .contact-intro {
    font-family: 'DM Sans', sans-serif;
    font-size: 16px; font-weight: 300;
    color: var(--mid-gray); line-height: 1.8;
    margin-bottom: 40px;
  }
  .contact-items { display: flex; flex-direction: column; gap: 20px; }
  .contact-item {
    display: flex; align-items: center; gap: 16px;
  }
  .contact-item-icon {
    width: 44px; height: 44px;
    border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; flex-shrink: 0;
  }
  .contact-item-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; color: var(--mid-gray);
    text-transform: uppercase; letter-spacing: 0.1em;
  }
  .contact-item-value {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; color: var(--charcoal); font-weight: 400;
  }
  .contact-right {}
  .contact-form { display: flex; flex-direction: column; gap: 20px; }
  .form-field { display: flex; flex-direction: column; gap: 8px; }
  .form-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; color: var(--mid-gray);
    text-transform: uppercase; letter-spacing: 0.1em;
  }
  .form-input, .form-textarea {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 300;
    padding: 14px 18px;
    border: 1px solid var(--border);
    background: var(--cream);
    color: var(--charcoal);
    outline: none;
    transition: border-color 0.2s;
    resize: none;
  }
  .form-input:focus, .form-textarea:focus { border-color: var(--accent); }
  .form-textarea { min-height: 120px; }

  /* FOOTER */
  footer {
    background: var(--charcoal); color: rgba(255,255,255,0.35);
    padding: 32px 80px;
    display: flex; align-items: center; justify-content: space-between;
    font-family: 'JetBrains Mono', monospace; font-size: 11px;
  }

  /* ANIMATIONS */
  .fade-in {
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  @media (max-width: 900px) {
    nav { padding: 16px 24px; }
    .nav-links { display: none; }
    section { padding: 72px 24px; }
    .hero { grid-template-columns: 1fr; }
    .hero-bg-decor { display: none; }
    .hero-right { padding: 40px 24px; }
    .hero-left { padding: 80px 24px 40px; }
    .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 48px; }
    .tech-grid, .projects-grid, .extra-grid { grid-template-columns: 1fr; }
    .soft-grid { grid-template-columns: 1fr; }
    footer { flex-direction: column; gap: 12px; text-align: center; }
    .achievement-row { grid-template-columns: 60px 1fr; }
    .achievement-year { display: none; }
  }
`;

const TerminalLine = ({ children, delay = 0, style: s = {} }) => (
  <div style={{ opacity: 1, ...s }}>{children}</div>
);

const TypedText = ({ text, speed = 60 }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) { setDisplayed(text.slice(0, i + 1)); i++; }
      else clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <span>{displayed}</span>;
};

const useFadeIn = () => {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-in');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

const SkillBar = ({ label, pct }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setWidth(pct); obs.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct]);
  return (
    <div className="skill-bar-item" ref={ref}>
      <div className="skill-bar-label"><span className="t-blue">{label}</span><span className="t-yellow-t">{pct}%</span></div>
      <div className="skill-bar-track">
        <div className="skill-bar-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
};

export default function Portfolio() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useFadeIn();

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const navLinks = ["About", "Skills", "Education", "Projects", "Achievements", "Contact"];
  const softSkills = [
    { emoji: "🧠", name: "Critical Thinking", desc: "Dissecting complex problems into elegant, manageable solutions." },
    { emoji: "🤝", name: "Team Collaboration", desc: "Building cohesive teams through open communication and trust." },
    { emoji: "⚡", name: "Adaptability", desc: "Thriving in fast-paced environments and embracing change." },
    { emoji: "🎯", name: "Leadership", desc: "Guiding teams with clarity, vision, and decisive action." },
    { emoji: "💬", name: "Communication", desc: "Translating technical complexity into clear, human language." },
    { emoji: "🔍", name: "Attention to Detail", desc: "Catching the subtle bugs and UX flaws others overlook." },
  ];
  const techCategories = [
    { icon: "⚙️", title: "Languages", items: ["Python", "JavaScript", "C#", "SQL"] },
    { icon: "🌐", title: "Frontend", items: ["React", "Next.js", "Angular", "Tailwind CSS"] },
    { icon: "🔧", title: "Backend", items: ["Node.js", "Express", "ASP.Net Core", "FastAPI", "REST APIs", "GraphQL"] },
    //{ icon: "☁️", title: "DevOps & Cloud", items: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "Vercel", "Nginx"] },
  ];
  const skillBars = [
    { label: "Problem Solving", pct: 95 },
    { label: "System Design", pct: 88 },
    { label: "Code Quality", pct: 92 },
  ];
  const projects = [
    { name: "NexusAI Dashboard", tags: ["React", "Python", "TensorFlow"], desc: "Real-time ML model monitoring platform with live metrics, A/B testing, and automated alerting for production AI pipelines." },
    { name: "DevLink API Gateway", tags: ["Node.js", "Redis", "Docker"], desc: "High-performance API gateway handling 50k+ req/s with intelligent rate limiting, caching, and request transformation." },
    { name: "QuantumChat", tags: ["WebSockets", "React", "MongoDB"], desc: "End-to-end encrypted messaging platform with real-time collaboration, voice rooms, and custom emoji reactions." },
    { name: "EcoTrack", tags: ["Next.js", "PostgreSQL", "AWS"], desc: "Carbon footprint tracker for organizations with AI-powered suggestions, ESG reporting, and team sustainability goals." },
    { name: "OpenCourse LMS", tags: ["Django", "React", "Celery"], desc: "Scalable learning management system supporting 10k+ concurrent learners with video streaming and AI tutoring." },
    { name: "CodeReview Bot", tags: ["GitHub API", "GPT-4", "FastAPI"], desc: "AI-powered code review assistant that flags security issues, suggests refactors, and auto-generates documentation." },
  ];
  const achievements = [
    { icon: "🏆", title: "National Hackathon Champion", sub: "RunnerUp at Codesphere 24hrs hackathon, GCOE, Jalgaon", year: "2025" },
    { icon: "⭐", title: "ASP.NET Core Certification", sub: "Gained hands-on experience in building web applications, REST APIs, and implementing MVC architecture.", year: "2025" },
    { icon: "🌟", title: "C# Programming Certification", sub: "Developed strong understanding of object-oriented programming, data structures, and application development using C#.", year: "2025" },
  ];
  const extras = [
    { emoji: "🎸", name: "Cricket", desc: "Played cricket recreationally, promoting teamwork, coordination, and stress management." },
    { emoji: "♟️", name: "Reading Books", desc: "Regularly engaged in reading, enhancing knowledge, focus, and critical thinking skills." },
    { emoji: "✍️", name: "Watching Movies & Web Series", desc: "Engaged in movies and web series to enhance creativity, storytelling understanding, and cultural awareness." },
  ];

  return (
    <>
      <style>{style}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo font-mono"><span>~/</span>Yash.dev</div>
        <ul className="nav-links">
          {navLinks.map(l => (
            <li key={l}><a href={`#${l.toLowerCase().replace(" ","")}`}>{l}</a></li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg-decor" />
        <div className="hero-left">
          <div className="hero-tag font-mono">Available for opportunities</div>
          <div className="hero-name-row">
            <h1 className="hero-name font-display">
              Yash<br /><span className="italic">Chavan</span>
            </h1>
            <div style={{flex:1}} />
            <div className="hero-photo-frame">
              <div className="hero-photo-inner">
                {/* Replace src below with your actual photo URL */}
                <div className="hero-photo-placeholder">
                  <div className="hero-photo-placeholder-icon">👤</div>
                  <div className="hero-photo-placeholder-label">photo</div>
                </div>
              </div>
              <span className="hero-photo-corner tl" />
              <span className="hero-photo-corner tr" />
              <span className="hero-photo-corner bl" />
              <span className="hero-photo-corner br" />
              <div className="hero-photo-status" title="Available">✦</div>
            </div>
          </div>
          <p className="hero-title font-display">Full-Stack Engineer & Builder</p>
          <p className="hero-desc font-sans">
            I craft performant web applications and elegant architectures — turning complex problems into clean, scalable code that ships.
          </p>
          <div className="hero-cta">
            <button className="btn-primary font-mono" onClick={() => document.getElementById('projects').scrollIntoView({behavior:'smooth'})}>View Projects</button>
            <button className="btn-ghost font-mono" onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})}>Get in Touch</button>
          </div>
        </div>
        <div className="hero-right" style={{zIndex:2}}>
          <div className="terminal-window">
            <div className="terminal-bar">
              <span className="t-dot t-red" /><span className="t-dot t-yellow" /><span className="t-dot t-green" />
              <span className="terminal-title font-mono">Yash@portfolio ~ zsh</span>
            </div>
            <div className="terminal-body">
              <div className="t-comment font-mono">// whoami.js — loading identity...</div>
              <br />
              <div className="font-mono">
                <span className="t-prompt">❯ </span>
                <span className="t-blue">const</span>
                <span className="t-white"> developer </span>
                <span className="t-yellow-t">= </span>
                <span className="t-white">{"{"}</span>
              </div>
              <div className="font-mono" style={{paddingLeft:20}}>
                <span className="t-green-t">name</span><span className="t-white">: </span><span className="t-yellow-t">'Yash Chavan'</span><span className="t-white">,</span>
              </div>
              <div className="font-mono" style={{paddingLeft:20}}>
                <span className="t-green-t">role</span><span className="t-white">: </span><span className="t-yellow-t">'Full-Stack Engineer'</span><span className="t-white">,</span>
              </div>
              <div className="font-mono" style={{paddingLeft:20}}>
                <span className="t-green-t">passion</span><span className="t-white">: </span><span className="t-yellow-t">'Building things that matter'</span><span className="t-white">,</span>
              </div>
              <div className="font-mono" style={{paddingLeft:20}}>
                <span className="t-green-t">status</span><span className="t-white">: </span><span className="t-green-t">'open_to_work'</span><span className="t-white">,</span>
              </div>
              <div className="font-mono" style={{paddingLeft:20}}>
                <span className="t-green-t">coffee</span><span className="t-white">: </span><span className="t-purple">Infinity</span>
              </div>
              <div className="font-mono"><span className="t-white">{"}"}</span></div>
              <br />
              <div className="font-mono">
                <span className="t-prompt">❯ </span>
                <span className="t-blue">npm run</span>
                <span className="t-white"> build-future</span>
              </div>
              <div className="font-mono t-comment">✓ Compiling greatness... done.</div>
              <div className="font-mono">
                <span className="t-prompt">❯ </span>
                <span className="t-white"><span className="cursor" /></span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll font-mono">scroll</div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="about-grid">
          <div className="about-left fade-in">
            <div className="section-tag">// 01 — ABOUT ME</div>
            <h2 className="section-title font-display">The Person <span className="accent">Behind</span> the Code</h2>
            <p className="about-text">
              Hey — I'm Yash. A <strong>full-stack engineer</strong> with 4+ years of turning caffeine and curiosity into production-grade software. I started coding at 14 by modding Minecraft plugins, and it spiraled gloriously from there.
            </p>
            <blockquote className="about-quote font-display">
              "Code is poetry — it should be beautiful, purposeful, and leave a reader better than they found it."
            </blockquote>
            <p className="about-text">
              I believe great software is built at the intersection of <strong>engineering rigour</strong> and <strong>design empathy</strong>. When I'm not deep in a codebase, I'm contributing to open source, writing technical breakdowns, or planning my next trail run.
            </p>
          </div>
          <div className="about-right fade-in">
            <div className="fun-card">
              <div className="fun-card-header">
                <span className="t-dot t-red" /><span className="t-dot t-yellow" /><span className="t-dot t-green" />
                <span className="terminal-title font-mono">fun_facts.json</span>
              </div>
              <div className="fun-card-body">
                <div className="t-white">{"{"}</div>
                <div className="t-green-t" style={{paddingLeft:16}}>"currently_learning": <span className="t-yellow-t">"Rust & WASM"</span>,</div>
                <div className="t-green-t" style={{paddingLeft:16}}>"side_project": <span className="t-yellow-t">"AI code reviewer"</span>,</div>
                <div className="t-green-t" style={{paddingLeft:16}}>"chess_rating": <span className="t-purple">1842</span>,</div>
                <div className="t-green-t" style={{paddingLeft:16}}>"tabs_or_spaces": <span className="t-red-t">"tabs 🔥"</span>,</div>
                <div className="t-green-t" style={{paddingLeft:16}}>"dark_mode": <span className="t-blue">true</span>,</div>
                <div className="t-green-t" style={{paddingLeft:16}}>"bugs_created": <span className="t-purple">∞</span>,</div>
                <div className="t-green-t" style={{paddingLeft:16}}>"bugs_fixed": <span className="t-green-t">∞ + 1</span></div>
                <div className="t-white">{"}"}</div>
              </div>
            </div>
            <div className="stat-grid">
              {[["--", "Years Experience"],["--","Projects Shipped"],["--","GitHub Stars"],["--","Blog Readers"]].map(([n,l]) => (
                <div className="stat-box" key={l}>
                  <div className="stat-number font-display">{n}</div>
                  <div className="stat-label font-mono">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SOFT SKILLS */}
      <section id="soft-skills">
        <div className="section-tag fade-in">// 02 — SOFT SKILLS</div>
        <h2 className="section-title font-display fade-in">The Human <span className="accent">Side</span></h2>
        <div className="soft-grid">
          {softSkills.map((s, i) => (
            <div className="soft-item fade-in" key={s.name}>
              <div className="soft-icon">{s.emoji}</div>
              <div className="soft-name font-display">{s.name}</div>
              <div className="soft-desc font-sans">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TECH SKILLS */}
      <section id="skills" style={{background:'var(--terminal-bg)'}}>
        <div className="section-tag" style={{color:'var(--terminal-green)'}}>// 03 — TECHNICAL SKILLS</div>
        <h2 className="section-title font-display fade-in" style={{color:'#E6EDF3'}}>My <span style={{color:'var(--terminal-green)',fontStyle:'italic'}}>Stack</span></h2>
        <div style={{height:1,background:'rgba(255,255,255,0.08)',marginBottom:48}} />
        <div className="tech-grid">
          {techCategories.map(cat => (
            <div className="tech-category fade-in" key={cat.title}>
              <div className="tech-cat-header">
                <span className="tech-cat-icon">{cat.icon}</span>
                <span className="tech-cat-title font-mono">// {cat.title}</span>
              </div>
              <div className="tech-items">
                {cat.items.map(item => <span className="tech-badge font-mono" key={item}>{item}</span>)}
              </div>
            </div>
          ))}
          <div className="tech-category fade-in" style={{gridColumn:'1/-1'}}>
            <div className="tech-cat-header">
              <span className="tech-cat-icon">📊</span>
              <span className="tech-cat-title font-mono">// Core Proficiency</span>
            </div>
            <div className="skill-bar-wrap">
              {skillBars.map(b => <SkillBar key={b.label} label={b.label} pct={b.pct} />)}
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{background:'var(--cream)'}}>
        <div className="section-tag fade-in">// 04 — EDUCATION</div>
        <h2 className="section-title font-display fade-in">Academic <span className="accent">Journey</span></h2>
        <div className="edu-timeline">
          {[
            { year:"2024 – 2028", degree:"B.Tech in Computer Science", school:"RC Patel Institute of Technology, Shirpur", detail:"Specialization in Distributed Systems & AI. Active member of the Programming Club and core organizer of TechFest.", badges:["CGPA: 9.4/10","Gold Medalist","Dean's List"] },
            { year:"2012 – 2022", degree:"Higher Secondary (Science)", school:"Thane Police School, Thane", detail:"Mathematics, Physics, Computer Science stream. State topper in CS with 98/100 in Board examinations.", badges:["63% aggregate","CS State Topper"] },
          ].map(e => (
            <div className="edu-item fade-in" key={e.year}>
              <div className="edu-dot" />
              <div className="edu-year font-mono">{e.year}</div>
              <div className="edu-degree font-display">{e.degree}</div>
              <div className="edu-school font-sans">{e.school}</div>
              <div className="edu-detail font-sans">{e.detail}</div>
              <div>{e.badges.map(b => <span className="edu-badge font-mono" key={b}>{b}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-tag fade-in">// 05 — PROJECTS</div>
        <h2 className="section-title font-display fade-in">Things I've <span className="accent">Built</span></h2>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div className="project-card fade-in" key={p.name} data-num={String(i + 1).padStart(2, '0')}>
              <div className="project-tags">{p.tags.map(t => <span className="project-tag font-mono" key={t}>{t}</span>)}</div>
              <div className="project-name font-display">{p.name}</div>
              <div className="project-desc font-sans">{p.desc}</div>
              <a href="#" className="project-link font-mono">View Project</a>
            </div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" style={{background:'var(--charcoal)'}}>
        <div className="section-tag fade-in" style={{color:'var(--accent-light)'}}>// 06 — ACHIEVEMENTS</div>
        <h2 className="section-title font-display fade-in" style={{color:'var(--cream)'}}>Wins & <span style={{color:'var(--accent)',fontStyle:'italic'}}>Milestones</span></h2>
        <div className="achievements-list">
          {achievements.map(a => (
            <div className="achievement-row fade-in" key={a.title}>
              <div className="achievement-icon">{a.icon}</div>
              <div className="achievement-info">
                <div className="achievement-title font-display">{a.title}</div>
                <div className="achievement-sub font-sans">{a.sub}</div>
              </div>
              <div className="achievement-year font-mono">{a.year}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EXTRACURRICULAR */}
      <section id="extracurricular" style={{background:'var(--cream)'}}>
        <div className="section-tag fade-in">// 07 — BEYOND CODE</div>
        <h2 className="section-title font-display fade-in">When I'm Not <span className="accent">Coding</span></h2>
        <div className="extra-grid">
          {extras.map(e => (
            <div className="extra-card fade-in" key={e.name}>
              <div className="extra-emoji">{e.emoji}</div>
              <div>
                <div className="extra-name font-display">{e.name}</div>
                <div className="extra-desc font-sans">{e.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-grid">
          <div className="contact-left fade-in">
            <div className="section-tag">// 08 — CONTACT</div>
            <h2 className="section-title font-display">Let's <span className="accent">Build</span><br />Together</h2>
            <p className="contact-intro font-sans">
              Whether it's a full-time role, a freelance gig, or just a great conversation about tech — I'm always open. Slide into my inbox.
            </p>
            <div className="contact-items">
              {[
                { icon: "✉️", label: "Email", value: "chavanyash2311@gmail.com" },
                { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/yashchavan" },
                { icon: "🐙", label: "GitHub", value: "" },
                { icon: "📍", label: "Location", value: "Dhule, India — Open to remote" },
              ].map(c => (
                <div className="contact-item" key={c.label}>
                  <div className="contact-item-icon">{c.icon}</div>
                  <div>
                    <div className="contact-item-label font-mono">{c.label}</div>
                    <div className="contact-item-value font-sans">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="contact-right fade-in">
            <div className="contact-form">
              {[
                { key: "name", label: "Your Name", type: "input", placeholder: "Your name" },
                { key: "email", label: "Email Address", type: "input", placeholder: "Email@example.com" },
                { key: "message", label: "Message", type: "textarea", placeholder: "Tell me about your project..." },
              ].map(f => (
                <div className="form-field" key={f.key}>
                  <label className="form-label font-mono">{f.label}</label>
                  {f.type === "input" ? (
                    <input
                      className="form-input font-sans"
                      placeholder={f.placeholder}
                      value={formData[f.key]}
                      onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                    />
                  ) : (
                    <textarea
                      className="form-textarea font-sans"
                      placeholder={f.placeholder}
                      value={formData[f.key]}
                      onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                    />
                  )}
                </div>
              ))}
              <button className="btn-primary font-mono" onClick={handleSubmit} style={{alignSelf:'flex-start'}}>
                {sent ? "✓ Message Sent!" : "Send Message →"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span className="font-mono">© 2024 Yash Chavan. Crafted with ♥ & ☕</span>
        <span className="font-mono">git commit -m "life is a journey"</span>
      </footer>
    </>
  );
}
