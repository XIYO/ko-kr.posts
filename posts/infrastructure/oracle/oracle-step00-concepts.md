---
title: Oracle Database 개념 가이드
dates:
  - "2025-07-21T15:45:51.000Z"
  - "2025-07-21T15:14:46.000Z"
authors:
  - XIYO
tags:
  - oracle
  - database
  - concepts
  - reference
---

# 오라클 0단계 개념

## Oracle이란?

Oracle은 원래 기업 이름이지만, Oracle Database가 너무 유명해져서 일반적으로 "Oracle"이라고 하면 Oracle Database를 지칭하는 대명사가 되었습니다.

### Oracle Corporation의 주요 제품

- **Oracle Database**: 관계형 데이터베이스 관리 시스템 (RDBMS)
- **Oracle Linux**: 기업용 Linux 운영체제
- **Java**: 프로그래밍 언어 및 플랫폼
- **MySQL**: 오픈소스 데이터베이스
- **VirtualBox**: 가상화 소프트웨어
- **WebLogic Server**: 애플리케이션 서버

## Oracle Database의 역사와 버전 체계

Oracle Database는 1977년 Larry Ellison이 창업한 Software Development Laboratories에서 시작되었습니다. 최초의 상용 관계형 데이터베이스 관리 시스템(RDBMS) 중 하나로, IBM의 System R 논문을 바탕으로 개발되었습니다.

### 버전과 에디션의 차이

Oracle에서는 **버전**과 **에디션**을 명확히 구분해야 합니다:

- **버전**: 시간에 따른 기능 발전 (11g, 12c, 19c, 21c, 23c)
- **에디션**: 같은 버전 내 라이센스별 기능 차이 (Free, Standard, Enterprise)

예시: Oracle 23c (버전)는 Free Edition, Standard Edition 2, Enterprise Edition (에디션)으로 제공됩니다.

### 주요 버전별 특징

- **Oracle 7** (1992): 저장 프로시저, 트리거 도입
- **Oracle 8** (1997): 객체-관계형 기능 추가
- **Oracle 8i** (1999): 인터넷 컴퓨팅 지원, **Service Name 도입**
- **Oracle 9i** (2001): Real Application Clusters (RAC) 도입
- **Oracle 10g** (2003): 그리드 컴퓨팅 지원
- **Oracle 11g** (2007): 자동 메모리 관리, 압축 기능
- **Oracle 12c** (2013): **멀티테넌트 아키텍처 (CDB/PDB) 도입**
- **Oracle 18c** (2018): 자율 운영 데이터베이스 기능
- **Oracle 19c** (2019): 장기 지원 버전 (LTS)
- **Oracle 21c** (2021): 블록체인 테이블, 자동 인덱싱
- **Oracle 23c** (2023): **Free Edition 출시**, AI 벡터 검색

### 버전 명명 규칙의 변화

- **i** (internet): 8i, 9i - 인터넷 시대를 반영
- **g** (grid): 10g, 11g - 그리드 컴퓨팅 시대를 반영
- **c** (cloud): 12c부터 현재까지 - 클라우드 시대를 반영

18c부터는 연도 기반 버전 체계로 변경되었습니다 (18c = 2018년, 19c = 2019년, 21c = 2021년, 23c = 2023년).

### 에디션별 특징과 제약사항

#### 무료 에디션

**Express Edition (XE)** - 레거시 무료 버전
- CPU: 최대 2 코어, RAM: 최대 2GB, 데이터: 최대 12GB
- 오래된 버전으로 신규 프로젝트에는 비권장

**Free Edition (23c)** - 최신 무료 버전
- CPU: 최대 2 스레드, 메모리: 최대 4GB (SGA+PGA), 데이터: 최대 12GB
- XE를 대체하는 개발자용 에디션

> [!TIP]
> 새로 시작한다면 Free Edition을 사용하세요. XE는 레거시 시스템 호환성이 필요한 경우에만 사용합니다.

#### 상용 에디션

**Standard Edition 2 (SE2)** - 중소기업용
- CPU: 최대 2 소켓, RAC 미지원
- Enterprise보다 저렴하지만 고급 기능 제한

**Enterprise Edition (EE)** - 대기업용
- 모든 기능 사용 가능, 제한 없음
- RAC, Partitioning, Advanced Security 등 포함
- 최소 수천만원부터 시작하는 고가 라이센스

> [!INFO]
> Oracle의 높은 라이센스 비용 때문에 많은 기업이 PostgreSQL, MySQL 등 오픈소스를 선택합니다.

## Oracle 아키텍처의 진화 - 파일 관점에서 이해하기

### Oracle 11g 이전 - 모든 데이터가 하나의 파일 세트에

Oracle 11g 이전에는 하나의 인스턴스가 하나의 데이터베이스를 관리했습니다. 모든 사용자(User1, User2, User3)의 데이터는 동일한 파일 세트(/oradata/ORCL/users.dbf)에 저장되었고, 각 사용자는 논리적으로만 구분되는 스키마로 존재했습니다.

**데이터 이전 시나리오**: "User1 데이터만 다른 서버로 이전해주세요"

1. users.dbf 파일 열기
2. User1의 테이블 찾기
3. 데이터를 하나하나 추출 (Export)
4. 새 서버에서 하나하나 삽입 (Import)

> 파일을 열어서 필요한 부분만 긁어내는 작업

### Oracle 12c 이후 - 각 PDB별로 독립된 파일

Oracle 12c부터는 하나의 인스턴스가 CDB(Container Database)를 통해 여러 PDB(Pluggable Database)를 관리합니다. PDB1은 독립된 파일(/oradata/CDB/PDB1/users.dbf)에 User1과 User2의 데이터를 저장하고, PDB2는 별도의 파일(/oradata/CDB/PDB2/users.dbf)에 User3과 User4의 데이터를 저장합니다. 각 PDB가 물리적으로 독립된 파일을 가집니다.

**데이터 이전 시나리오**: "PDB1 데이터를 다른 서버로 이전해주세요"

1. PDB1 폴더 통째로 복사
2. 새 서버에 붙여넣기
3. 끝!

> 파일 자체가 분리되어 있어 복사-붙여넣기로 끝

> [!NOTE]
> **.dbf 파일을 Oracle은 "테이블스페이스"라고 브랜딩합니다**
> 
> 실제로는 CSV 파일처럼 데이터를 저장하는 파일입니다 (Oracle 전용 도구로만 읽을 수 있는 바이너리 형식).
> - system.dbf = SYSTEM 테이블스페이스
> - users.dbf = USERS 테이블스페이스
> - sysaux.dbf = SYSAUX 테이블스페이스
> 
> 다른 DB는 그냥 "데이터 파일"이라고 부르는데, Oracle은 브랜딩을 위해 "테이블스페이스"라고 부릅니다.

## SID와 Service Name

앞서 살펴본 Oracle의 파일 구조 변화는 데이터베이스 접속 방법에도 큰 변화를 가져왔습니다. 파일이 분리되면서 각각을 식별하고 접속하는 방법도 진화해야 했습니다.

### 초기: 파일 세트 전체를 가리키는 SID

Oracle 11g 이전에는 /oradata/ORCL/ 디렉토리의 모든 파일이 하나의 데이터베이스였습니다. 이 전체 파일 세트를 관리하는 인스턴스를 식별하는 이름이 바로 **SID(System Identifier)**였습니다. ORCL이라는 SID로 접속하면 해당 디렉토리의 모든 데이터에 접근할 수 있었습니다.

### Oracle 8i (1999년): Service Name 등장 - 별명의 필요성

**문제 상황**:

하나의 Oracle 인스턴스(SID: ORCL)에 영업팀 100명, 인사팀 50명, 그리고 야간 배치 프로세스가 모두 동시에 접속하는 상황을 생각해보세요. 모든 접속이 동일한 ORCL이라는 식별자로만 보이기 때문에 누가 데이터베이스를 느리게 만드는지 알 수 없고, 부서별로 리소스를 제한할 방법도 없었습니다.

**해결책: Service Name (별명 시스템)**:

Oracle은 여전히 하나의 데이터베이스(SID: ORCL)를 유지하면서도, 영업팀은 SALES_SVC, 인사팀은 HR_SVC, 배치 프로세스는 BATCH_SVC라는 별명으로 접속하도록 했습니다. 이를 통해 접속 통계를 분리하고, Resource Manager를 이용한 그룹별 리소스 제한과 QoS(Quality of Service) 관리가 가능해졌습니다.

### Oracle 12c (2013년): Service Name의 진화 - 진짜 분리

**구조의 변화**:

11g까지는 하나의 인스턴스가 하나의 데이터베이스를 관리했고, 여러 Service Name은 모두 같은 데이터베이스를 가리키는 별명에 불과했습니다.

12c부터는 하나의 인스턴스가 CDB를 관리하고, 그 안에 여러 개의 독립적인 PDB가 존재합니다. PDB1은 FREEPDB1이라는 Service Name을, PDB2는 MYPDB라는 Service Name을, PDB3는 TESTPDB라는 Service Name을 가집니다. 이제 Service Name이 실제로 서로 다른 데이터베이스를 가리키게 된 것입니다.

**접속 방식의 변화**:
- SID로 접속 → CDB(관리자용)
- Service Name으로 접속 → 각각의 PDB(사용자용)

> [!NOTE]
> Service Name의 본질은 여전히 "별명"입니다.
> - 8i~11g: 같은 DB의 여러 별명
> - 12c~: 독립된 PDB의 별명
> 
> 하나의 PDB에도 여러 Service Name을 만들 수 있습니다.
## Oracle의 독특한 스키마 개념: User = Schema

### 핵심: Oracle User가 다른 DB의 Schema에 해당

| 데이터베이스 | 테이블을 그룹화하는 방법 | 명령어 |
|------------|----------------------|--------|
| PostgreSQL | Schema (Database 안에 여러 개) | CREATE SCHEMA sales; |
| MySQL | Database = Schema | CREATE DATABASE sales; |
| **Oracle** | **User = Schema** | CREATE USER sales ...; |

### 왜 Oracle은 User = Schema인가?

다른 DB: "테이블을 어떻게 그룹화할까?" → Schema 개념 도입
Oracle: "각 사용자가 자기 테이블을 가지면 되지" → User = Schema

결과:
- sales 사용자 생성 = sales 스키마 자동 생성
- hr 사용자 생성 = hr 스키마 자동 생성


> [!NOTE]
> **Oracle의 CREATE SCHEMA 명령어의 진실**
> 
> Oracle에도 CREATE SCHEMA 명령어는 존재하지만, 이것은 **새 스키마를 만드는 명령어가 아닙니다**.
> - 실제로는 **한 트랜잭션 내에서 여러 테이블과 뷰를 한번에 생성**하는 명령어
> - 스키마는 여전히 User 생성 시 자동으로만 만들어짐
> - PostgreSQL의 CREATE SCHEMA와는 완전히 다른 기능
> 
> **중요**: Oracle에서는 1 User = 1 Schema입니다. 한 사용자가 여러 스키마를 가질 수 없고, 스키마 없는 사용자도 있을 수 없습니다.

## 다음 단계

[오라클 1단계 도커 설치](oracle-step01-docker-installation)