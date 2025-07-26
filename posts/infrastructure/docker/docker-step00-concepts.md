---
title: Docker 개념 가이드
description: Docker의 기본 개념과 컨테이너 기술을 이해하기 위한 가이드입니다. 가상화와 컨테이너화의 차이점, Docker의 핵심 구성 요소를 설명합니다.
dates:
  - "2025-07-26T08:00:00.000Z"
authors:
  - XIYO
tags:
  - docker
  - container
  - concepts
  - virtualization
  - reference
---

# 도커 0단계 개념

## Docker란?

Docker는 애플리케이션을 컨테이너라는 독립적인 환경에서 실행할 수 있게 해주는 오픈소스 플랫폼입니다. "Build, Ship, and Run Any App, Anywhere"라는 슬로건처럼, 어떤 환경에서든 동일하게 실행되는 애플리케이션을 만들 수 있습니다.

## 가상화 vs 컨테이너화

### 전통적인 가상화 (VM)
- **전체 OS 포함**: 각 VM은 완전한 운영체제를 포함
- **무거움**: 수 GB의 공간 필요
- **느린 시작**: 부팅에 수 분 소요
- **리소스 집약적**: CPU, 메모리 많이 사용

### 컨테이너화 (Docker)
- **OS 커널 공유**: 호스트 OS의 커널을 공유
- **가벼움**: 수 MB ~ 수백 MB
- **빠른 시작**: 초 단위로 시작
- **효율적**: 최소한의 리소스만 사용

## Docker의 핵심 구성 요소

### 1. Docker Image
- 컨테이너 실행에 필요한 모든 것을 포함한 **읽기 전용 템플릿**
- 애플리케이션 코드, 런타임, 라이브러리, 환경 변수, 설정 파일 포함
- **레이어 구조**로 효율적인 저장 및 전송

### 2. Docker Container
- 이미지를 기반으로 생성된 **실행 가능한 인스턴스**
- 격리된 프로세스로 실행
- 필요에 따라 시작, 중지, 삭제 가능

### 3. Docker Registry
- Docker 이미지를 저장하고 배포하는 **저장소**
- **Docker Hub**: 공식 퍼블릭 레지스트리
- **Private Registry**: 기업 내부용 레지스트리

### 4. Dockerfile
- Docker 이미지를 만들기 위한 **명령어 스크립트**
- 베이스 이미지 선택부터 애플리케이션 설정까지 정의

## Docker의 주요 이점

### 1. 이식성 (Portability)
- "내 컴퓨터에서는 잘 되는데?" 문제 해결
- 개발, 테스트, 프로덕션 환경 일관성

### 2. 확장성 (Scalability)
- 컨테이너 단위로 쉽게 스케일 업/다운
- 마이크로서비스 아키텍처에 최적

### 3. 효율성 (Efficiency)
- VM 대비 적은 리소스 사용
- 빠른 배포 및 롤백

### 4. 격리성 (Isolation)
- 애플리케이션 간 충돌 방지
- 보안 향상

## Docker 사용 사례

### 개발 환경 구축
```yaml
# docker-compose.yml 예시
version: '3'
services:
  web:
    image: nginx
  db:
    image: postgres
  redis:
    image: redis
```

### CI/CD 파이프라인
- 일관된 빌드 환경
- 자동화된 테스트 및 배포

### 마이크로서비스
- 서비스별 독립적인 컨테이너
- 개별 확장 및 업데이트

### 레거시 애플리케이션 현대화
- 기존 애플리케이션을 컨테이너화
- 클라우드 마이그레이션 용이

## 다음 단계

Docker의 개념을 이해했다면, 다음 단계로 진행하세요:
- [Docker 설치 가이드](../docker/docker-step01-installation)
- [Oracle Docker 설치](../oracle/oracle-step01-docker-installation)

> [!TIP]
> Docker는 단순한 도구가 아닌 **개발 문화의 변화**입니다. 컨테이너 기반 개발을 통해 더 빠르고 안정적인 소프트웨어 배포가 가능해집니다.