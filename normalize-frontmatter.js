#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 프론트매터를 통일된 형식으로 정규화
 */
function normalizeFrontmatter(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 프론트매터 추출
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) {
        console.log(`No frontmatter found in ${filePath}`);
        return false;
    }
    
    const frontmatterStr = match[1];
    const body = match[2];
    
    let frontmatter;
    try {
        frontmatter = yaml.load(frontmatterStr);
    } catch (e) {
        console.log(`Failed to parse frontmatter in ${filePath}:`, e.message);
        return false;
    }
    
    const changes = [];
    
    // date -> dates 변환
    if (frontmatter.date) {
        const dateValue = frontmatter.date;
        if (typeof dateValue === 'string') {
            // YYYY-MM-DD 형식을 ISO 형식으로 변환
            const date = new Date(dateValue);
            if (!isNaN(date)) {
                // 한국 시간대로 설정 (UTC+9)
                const isoDate = new Date(date.getTime() + (9 * 60 * 60 * 1000))
                    .toISOString()
                    .replace('Z', '+09:00');
                frontmatter.dates = [isoDate];
            } else {
                frontmatter.dates = [dateValue];
            }
        } else {
            frontmatter.dates = [String(dateValue)];
        }
        delete frontmatter.date;
        changes.push('date -> dates');
    }
    
    // dates가 문자열이면 배열로 변환
    else if (frontmatter.dates && !Array.isArray(frontmatter.dates)) {
        frontmatter.dates = [frontmatter.dates];
        changes.push('dates: string -> array');
    }
    
    // author -> authors 변환
    if (frontmatter.author) {
        if (Array.isArray(frontmatter.author)) {
            frontmatter.authors = frontmatter.author;
        } else {
            frontmatter.authors = [frontmatter.author];
        }
        delete frontmatter.author;
        changes.push('author -> authors');
    }
    
    // authors가 문자열이면 배열로 변환
    else if (frontmatter.authors && !Array.isArray(frontmatter.authors)) {
        frontmatter.authors = [frontmatter.authors];
        changes.push('authors: string -> array');
    }
    
    // tags가 없으면 빈 배열 추가
    if (!frontmatter.tags) {
        frontmatter.tags = [];
        changes.push('added empty tags');
    }
    
    // title이 없으면 파일명에서 생성
    if (!frontmatter.title) {
        const baseName = path.basename(filePath, '.md');
        // kebab-case를 Title Case로 변환
        const title = baseName
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        frontmatter.title = title;
        changes.push(`added title: ${title}`);
    }
    
    // 변경사항이 있으면 파일 업데이트
    if (changes.length > 0) {
        // 필수 필드 순서 정의
        const fieldOrder = ['title', 'description', 'category', 'authors', 'dates', 'tags', 'draft', 'messages'];
        
        // 순서대로 정렬된 객체 생성
        const orderedFrontmatter = {};
        fieldOrder.forEach(field => {
            if (frontmatter[field] !== undefined) {
                orderedFrontmatter[field] = frontmatter[field];
            }
        });
        
        // 나머지 필드 추가
        Object.keys(frontmatter).forEach(key => {
            if (!orderedFrontmatter.hasOwnProperty(key)) {
                orderedFrontmatter[key] = frontmatter[key];
            }
        });
        
        // YAML로 변환
        const yamlStr = yaml.dump(orderedFrontmatter, {
            indent: 2,
            lineWidth: 80,
            noRefs: true,
            sortKeys: false
        });
        
        // 파일 다시 쓰기
        const newContent = `---\n${yamlStr}---\n${body}`;
        fs.writeFileSync(filePath, newContent, 'utf-8');
        
        console.log(`Updated ${filePath}: ${changes.join(', ')}`);
        return true;
    }
    
    return false;
}

/**
 * 디렉토리 내 모든 마크다운 파일 처리
 */
function processDirectory(directory, dryRun = false) {
    let totalFiles = 0;
    let updatedFiles = 0;
    
    function walkDir(dir) {
        const files = fs.readdirSync(dir);
        
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                walkDir(filePath);
            } else if (file.endsWith('.md') && file !== 'README.md') {
                totalFiles++;
                
                if (dryRun) {
                    console.log(`Would process: ${filePath}`);
                } else {
                    if (normalizeFrontmatter(filePath)) {
                        updatedFiles++;
                    }
                }
            }
        });
    }
    
    walkDir(directory);
    
    console.log(`\nTotal files: ${totalFiles}`);
    if (!dryRun) {
        console.log(`Updated files: ${updatedFiles}`);
    }
}

/**
 * 메인 함수
 */
function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('Usage: node normalize-frontmatter.js <directory> [--dry-run]');
        process.exit(1);
    }
    
    const directory = args[0];
    const dryRun = args.includes('--dry-run');
    
    if (!fs.existsSync(directory)) {
        console.log(`Directory not found: ${directory}`);
        process.exit(1);
    }
    
    console.log(`Processing directory: ${directory}`);
    if (dryRun) {
        console.log('DRY RUN MODE - No files will be modified\n');
    }
    
    processDirectory(directory, dryRun);
}

// 스크립트 실행
main();