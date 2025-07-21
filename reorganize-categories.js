#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 파일 이동 매핑
const reorganizationMap = {
    // 루트 레벨 파일들
    'posts/cookies.md': 'posts/development/web/cookies.md',
    'posts/git-hooks-frontmatter-automation-journey.md': 'posts/development/git/git-hooks-frontmatter-automation-journey.md',
    
    // blog는 그대로 유지
    'posts/blog/**': 'posts/blog/**',
    
    // 프로그래밍 언어
    'posts/language/Java/**': 'posts/development/languages/java/**',
    'posts/language/javascript/**': 'posts/development/languages/javascript/**',
    
    // 디자인 패턴
    'posts/design-pattern/**': 'posts/development/patterns/**',
    
    // Svelte 통합
    'posts/svelte/**': 'posts/development/frameworks/svelte/**',
    'posts/dlog/svelte/**': 'posts/development/frameworks/svelte/**',
    
    // 기타 dlog 콘텐츠
    'posts/dlog/installing-drivers-on-lg-gram.md': 'posts/systems/hardware/installing-drivers-on-lg-gram.md',
    
    // Docker
    'posts/docker/**': 'posts/infrastructure/docker/**',
    
    // Git
    'posts/package/git/**': 'posts/development/git/**',
    
    // Tools
    'posts/tools/obsidian/**': 'posts/tools/note-taking/obsidian/**',
    
    // Windows
    'posts/windows/intellij/**': 'posts/tools/ide/intellij/**',
    'posts/windows/system/**': 'posts/systems/windows/**',
    
    // Unix-like systems
    'posts/xnix/asuswrt/**': 'posts/systems/router-firmware/asuswrt/**',
    'posts/xnix/centos/**': 'posts/systems/linux/centos/**',
    'posts/xnix/checking-background-jobs.md': 'posts/systems/unix/checking-background-jobs.md',
    
    // macOS
    'posts/xnix/macos/setup/**': 'posts/systems/macos/setup/**',
    'posts/xnix/macos/intelliJ/**': 'posts/tools/ide/intellij/**',
    'posts/xnix/macos/brew-install-mongodb.md': 'posts/systems/macos/package-management/brew-install-mongodb.md',
    'posts/xnix/macos/lock-desktop-space.md': 'posts/systems/macos/desktop/lock-desktop-space.md',
};

// 디렉토리 생성 함수
function ensureDirectoryExists(filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Created directory: ${dir}`);
    }
}

// 파일 이동 함수
function moveFile(source, destination) {
    if (!fs.existsSync(source)) {
        console.log(`Source not found: ${source}`);
        return false;
    }
    
    ensureDirectoryExists(destination);
    
    try {
        fs.renameSync(source, destination);
        console.log(`Moved: ${source} → ${destination}`);
        return true;
    } catch (error) {
        console.error(`Error moving ${source}: ${error.message}`);
        return false;
    }
}

// 와일드카드 패턴 처리
function processWildcardPattern(pattern, targetPattern) {
    const baseDir = pattern.replace('/**', '');
    const targetBaseDir = targetPattern.replace('/**', '');
    
    if (!fs.existsSync(baseDir)) {
        return;
    }
    
    function walkDir(currentPath, relativePath = '') {
        const items = fs.readdirSync(currentPath);
        
        items.forEach(item => {
            const itemPath = path.join(currentPath, item);
            const itemRelativePath = path.join(relativePath, item);
            const stat = fs.statSync(itemPath);
            
            if (stat.isDirectory()) {
                walkDir(itemPath, itemRelativePath);
            } else {
                const targetPath = path.join(targetBaseDir, itemRelativePath);
                moveFile(itemPath, targetPath);
            }
        });
    }
    
    walkDir(baseDir);
}

// 메인 실행 함수
function reorganizeCategories() {
    console.log('Starting category reorganization...\n');
    
    let movedCount = 0;
    
    // 각 매핑 처리
    Object.entries(reorganizationMap).forEach(([source, target]) => {
        if (source.includes('**')) {
            processWildcardPattern(source, target);
        } else {
            if (moveFile(source, target)) {
                movedCount++;
            }
        }
    });
    
    console.log(`\nReorganization complete. Moved ${movedCount} files.`);
    
    // 빈 디렉토리 정리
    cleanEmptyDirectories('posts');
}

// 빈 디렉토리 제거
function cleanEmptyDirectories(dir) {
    if (!fs.existsSync(dir)) return;
    
    let isEmpty = true;
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
            if (!cleanEmptyDirectories(itemPath)) {
                isEmpty = false;
            }
        } else {
            isEmpty = false;
        }
    });
    
    if (isEmpty && dir !== 'posts') {
        fs.rmdirSync(dir);
        console.log(`Removed empty directory: ${dir}`);
    }
    
    return isEmpty;
}

// Dry run 모드
function dryRun() {
    console.log('DRY RUN - Showing what would be moved:\n');
    
    Object.entries(reorganizationMap).forEach(([source, target]) => {
        if (source.includes('**')) {
            console.log(`${source} → ${target}`);
        } else {
            if (fs.existsSync(source)) {
                console.log(`${source} → ${target}`);
            }
        }
    });
}

// CLI 처리
const args = process.argv.slice(2);
if (args.includes('--dry-run')) {
    dryRun();
} else {
    reorganizeCategories();
}