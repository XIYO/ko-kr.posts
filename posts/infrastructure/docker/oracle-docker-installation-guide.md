---
title: Oracle Docker Installation Guide
tags:
  - docker
  - oracle
  - database
  - guide
  - installation
---

# Oracle Docker Quick Install Guide

이 가이드는 Docker를 사용하여 Oracle Database Free Edition을 빠르게 설치하는 방법을 설명합니다.

> [!INFO]
> Oracle Database의 개념과 에디션에 대한 자세한 내용은 [Oracle Database 개념 가이드](oracle-database-concepts.md)를 참조하세요.

## 사전 요구사항

- Docker Desktop 설치 완료
- 최소 2GB RAM 여유 공간
- 최소 15GB 디스크 여유 공간

## Oracle Database Free Edition 설치

### Oracle Database 23c Free 이미지 다운로드

> [!INFO]
> **Container Registry란?**
> Docker 이미지를 저장하고 배포하는 저장소입니다. Docker Hub가 가장 유명하지만, 
> Oracle은 자체 Container Registry(container-registry.oracle.com)를 운영합니다.
> 
> 대부분의 Container Registry는 로그인 후 이미지를 다운로드하는 것이 원칙입니다.
> 하지만 Oracle은 Free Edition을 "미끼 상품"으로 활용하여 로그인 없이도 다운로드할 수 있게 허용합니다.
> 
> Container Registry에 대한 자세한 내용은 [Oracle Database 개념 가이드](/ko-kr/posts/infrastructure/docker/oracle-database-concepts)를 참조하세요.

개발자를 위한 최신 무료 버전인 Oracle Database 23c Free를 다운로드합니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:
```bash
docker pull container-registry.oracle.com/database/free:latest
```
## Oracle Free 컨테이너 실행

### 기본 실행

Oracle Free 23c 컨테이너를 실행합니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:
```bash
docker run -d --name oracle-free -p 1521:1521 -p 5500:5500 -e ORACLE_PWD=oracle123 container-registry.oracle.com/database/free:latest
```

위 명령어의 각 옵션 설명:

**기본 실행 옵션:**
- `-d`: 백그라운드로 실행
- `--name oracle-free`: 컨테이너 이름 지정
- `-p 1521:1521`: 데이터베이스 포트 매핑
- `-p 5500:5500`: Enterprise Manager Express 포트 매핑

**필수 환경 변수:**
- `-e ORACLE_PWD=oracle123`: SYS, SYSTEM, PDBADMIN 사용자의 비밀번호 설정

**선택적 환경 변수 (필요시 추가):**
- `-e ORACLE_CHARACTERSET=KO16MSWIN949`: 문자셋 변경 (기본값: AL32UTF8)
- `-e ORACLE_PDB=MYAPP`: PDB 이름 변경 (기본값: FREEPDB1)
- `-e ENABLE_ARCHIVELOG=true`: 아카이브 로그 모드 활성화
- `-v oracle-free-data:/opt/oracle/oradata`: 데이터 영구 보존

> [!INFO]
> **접속 정보**
> - **포트**: 1521 (데이터베이스), 5500 (웹 관리 도구)
> - **기본 사용자**: SYS, SYSTEM (비밀번호는 위에서 설정한 oracle123)
> - **데이터베이스 이름**: FREEPDB1
> 
> 접속 문자열 예시: `username/password@localhost:1521/FREEPDB1`
> 
> SID, Service Name, PDB 등 Oracle의 핵심 개념들은 [Oracle Database 개념 가이드](oracle-database-concepts.md#oracle의-핵심-개념)를 참조하세요.



## 컨테이너 상태 확인

### 로그 확인

oracle-free 컨테이너의 로그를 실시간으로 확인합니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:
```bash
docker logs -f oracle-free
```

데이터베이스가 준비되면 다음 메시지가 표시됩니다:
```
DATABASE IS READY TO USE!
```

### 컨테이너 상태 확인

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:
```bash
docker ps -a | grep oracle
```

### 데이터베이스 상태 확인

컨테이너가 정상적으로 실행되고 있는지 확인합니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:
```bash
docker ps | grep oracle-free
```


## 문제 해결

### 포트 충돌

포트 충돌이 발생하면 먼저 1521 포트를 사용하는 프로세스를 확인합니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:
```bash
lsof -i :1521
```

**출력 예시:**

포트가 사용되지 않는 경우 (정상):
```
# 아무 결과 없음 (빈 화면)
```

포트가 이미 사용 중인 경우:
```
COMMAND   PID      USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
com.docke 642 username  190u  IPv6 0x651391288870c513      0t0  TCP *:ncube-lm (LISTEN)
```

Docker 컨테이너 실행 시 포트 충돌 에러:
```
docker: Error response from daemon: failed to set up container networking: 
Bind for 0.0.0.0:1521 failed: port is already allocated
```

포트 충돌 해결 방법 두 가지:

#### 기존 컨테이너 중지로 문제 해결

기존 Oracle 컨테이너를 중지하고 새로 시작합니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:
```bash
docker stop oracle-free
```

#### 다른 포트로 문제 해결

여러 Oracle을 동시에 실행하려면 다른 포트를 사용합니다.

터미널을 열고 아래 명령어를 복사해서 붙여넣으세요:
```bash
docker run -d --name oracle-free2 -p 1522:1521 -p 5501:5500 -e ORACLE_PWD=YourPassword123 container-registry.oracle.com/database/free:latest
```
