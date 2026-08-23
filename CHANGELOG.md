# Changelog

All notable changes to this project will be documented in this file.
This file is automatically updated by the AI Agent Skill (`document-code-changes`).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased] - 2026-08-23

### Added
- **Checkmate Chess Case Study (`projects/checkmate-chess.html`)**: Dedicated case study page featuring Stockfish AI engine integration (10 skill levels), precision Fischer increment timers, ranked ELO rating, daily missions, achievements, and an interactive high-resolution screenshot gallery with click-to-zoom lightbox for board views, store loadouts, and game room previews.
- **Sipspot Cafe POS & IMS Case Study (`projects/sipspot-ims.html`)**: Comprehensive case study breakdown covering the high-speed touch POS register, automated raw ingredient Bill of Materials (BOM) costing, real-time COGS profit margin tracking, Bluetooth ESC/POS receipt printing, and multi-screenshot visual showcase.
- **Projects Hub Expansion (`projects.html`)**: Integrated both Sipspot Cafe POS & IMS (Project 04) and Checkmate Chess (Project 05) with preview thumbnails, technology badges, concise summaries, and case study links.
- **Homepage Projects Grid (`index.html`)**: Added featured project cards for Sipspot POS & IMS and Checkmate Chess with updated `01 / 05` to `05 / 05` counter indexing.
- **Screenshot Gallery & Lightbox System (`projects/project-case.css`)**: Styled responsive `.gallery-grid`, `.gallery-card`, hover effects, zoom badges, and modal lightbox overlay (`.image-lightbox`) for exploring full-resolution application screenshots.

### Changed
- **Navigation Chain Across Case Studies**: Updated circular previous/next navigation links across `um-org-connect.html`, `attendify.html`, `ncip-eap.html`, `sipspot-ims.html`, and `checkmate-chess.html` for a cohesive browsing experience.
- **Projects Grid Layout (`assets/css/styles.css`)**: Enhanced `.projects-grid` with `repeat(auto-fit, minmax(340px, 1fr))` for fluid responsive distribution across multiple screen breakpoints.
