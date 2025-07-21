#!/usr/bin/env python3
import os
import re
import yaml
from datetime import datetime
import argparse

def normalize_frontmatter(file_path):
    """프론트매터를 통일된 형식으로 정규화"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 프론트매터 추출
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if not match:
        print(f"No frontmatter found in {file_path}")
        return False
    
    frontmatter_str = match.group(1)
    body = match.group(2)
    
    try:
        frontmatter = yaml.safe_load(frontmatter_str)
    except:
        print(f"Failed to parse frontmatter in {file_path}")
        return False
    
    # 변경사항 추적
    changes = []
    
    # date -> dates 변환
    if 'date' in frontmatter:
        date_value = frontmatter['date']
        if isinstance(date_value, str):
            # YYYY-MM-DD 형식을 ISO 형식으로 변환
            try:
                dt = datetime.strptime(date_value, '%Y-%m-%d')
                frontmatter['dates'] = [dt.strftime('%Y-%m-%dT%H:%M:%S+09:00')]
            except:
                frontmatter['dates'] = [date_value]
        else:
            frontmatter['dates'] = [str(date_value)]
        del frontmatter['date']
        changes.append("date -> dates")
    
    # dates가 문자열이면 배열로 변환
    elif 'dates' in frontmatter and isinstance(frontmatter['dates'], str):
        frontmatter['dates'] = [frontmatter['dates']]
        changes.append("dates: string -> array")
    
    # author -> authors 변환
    if 'author' in frontmatter:
        author_value = frontmatter['author']
        if isinstance(author_value, list):
            frontmatter['authors'] = author_value
        else:
            frontmatter['authors'] = [author_value]
        del frontmatter['author']
        changes.append("author -> authors")
    
    # authors가 문자열이면 배열로 변환
    elif 'authors' in frontmatter and isinstance(frontmatter['authors'], str):
        frontmatter['authors'] = [frontmatter['authors']]
        changes.append("authors: string -> array")
    
    # tags가 없으면 빈 배열 추가
    if 'tags' not in frontmatter:
        frontmatter['tags'] = []
        changes.append("added empty tags")
    
    # title이 없으면 파일명에서 생성
    if 'title' not in frontmatter:
        base_name = os.path.basename(file_path).replace('.md', '')
        # kebab-case를 Title Case로 변환
        title = ' '.join(word.capitalize() for word in base_name.split('-'))
        frontmatter['title'] = title
        changes.append(f"added title: {title}")
    
    # 필수 필드 순서 정의
    field_order = ['title', 'description', 'category', 'authors', 'dates', 'tags', 'draft', 'messages']
    
    # 순서대로 정렬된 딕셔너리 생성
    ordered_frontmatter = {}
    for field in field_order:
        if field in frontmatter:
            ordered_frontmatter[field] = frontmatter[field]
    
    # 나머지 필드 추가
    for key, value in frontmatter.items():
        if key not in ordered_frontmatter:
            ordered_frontmatter[key] = value
    
    # 변경사항이 있으면 파일 업데이트
    if changes:
        # YAML 덤프 (더 깔끔한 형식으로)
        yaml_str = yaml.dump(ordered_frontmatter, 
                           default_flow_style=False, 
                           allow_unicode=True,
                           sort_keys=False,
                           width=80)
        
        # 파일 다시 쓰기
        new_content = f"---\n{yaml_str}---\n{body}"
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Updated {file_path}: {', '.join(changes)}")
        return True
    
    return False

def process_directory(directory, dry_run=False):
    """디렉토리 내 모든 마크다운 파일 처리"""
    total_files = 0
    updated_files = 0
    
    for root, dirs, files in os.walk(directory):
        # README.md는 제외
        markdown_files = [f for f in files if f.endswith('.md') and f != 'README.md']
        
        for file in markdown_files:
            file_path = os.path.join(root, file)
            total_files += 1
            
            if dry_run:
                print(f"Would process: {file_path}")
            else:
                if normalize_frontmatter(file_path):
                    updated_files += 1
    
    print(f"\nTotal files: {total_files}")
    print(f"Updated files: {updated_files}")

def main():
    parser = argparse.ArgumentParser(description='Normalize frontmatter in markdown files')
    parser.add_argument('directory', help='Directory to process')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be changed without modifying files')
    
    args = parser.parse_args()
    
    if not os.path.exists(args.directory):
        print(f"Directory not found: {args.directory}")
        return
    
    process_directory(args.directory, args.dry_run)

if __name__ == "__main__":
    main()