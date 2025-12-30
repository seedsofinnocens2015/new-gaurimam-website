# Hostinger Deployment Guide

## Build Command
```bash
npm run build
```

## Deployment Steps

### 1. Build the Project
```bash
cd landing-astro
npm run build
```

### 2. Upload to Hostinger
- Go to h-panel File Manager
- Navigate to `public_html/gads/nov25/delhi/` folder
- Upload **ALL** files and folders from `dist/` folder:
  - `index.html`
  - `_astro/` folder (with all JS/CSS files)
  - `Images/` folder
  - `SOI.png`
  - `.htaccess` file (IMPORTANT!)

### 3. File Permissions (via h-panel)
Set these permissions:
- Folders: `755` or `0755`
- Files: `644` or `0644`
- `.htaccess`: `644` or `0644`

### 4. Verify
Visit: `https://www.seedsofinnocens.com/gads/nov25/delhi/`

## Troubleshooting 403 Forbidden Error

### Check 1: `.htaccess` File
- Ensure `.htaccess` file is uploaded in `gads/nov25/delhi/` folder
- File permissions should be `644`
- File should not be named `.htaccess.txt` (must be exactly `.htaccess`)

### Check 2: Folder Permissions
- `gads/nov25/delhi/` folder should have `755` permissions
- All subfolders should have `755` permissions

### Check 3: Index File
- `index.html` must be present in `gads/nov25/delhi/` folder
- File permissions should be `644`

### Check 4: Apache Configuration
- Ensure Apache `mod_rewrite` is enabled (usually enabled by default on Hostinger)
- Check if `.htaccess` files are allowed in your hosting plan

## Quick Fix Commands (via SSH/FTP)
If you have SSH access:
```bash
cd public_html/gads/nov25/delhi/
chmod 644 .htaccess
chmod 644 index.html
chmod 755 _astro
chmod 755 Images
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;
```

## Folder Structure After Deployment
```
public_html/
└── gads/
    └── nov25/
        └── delhi/
            ├── .htaccess
            ├── index.html
            ├── SOI.png
            ├── _astro/
            │   ├── client.*.js
            │   ├── index.*.css
            │   └── *.js files
            └── Images/
                └── (all image files)
```

