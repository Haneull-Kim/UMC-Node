import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // option_category 삽입
  await prisma.$executeRawUnsafe(`
    INSERT INTO option_category (description) VALUES
    ('만 14세 이상입니다.')
  `);

  await prisma.$executeRawUnsafe(`
    INSERT INTO option_category (description) VALUES
    ('서비스 이용 약관')
  `);

  await prisma.$executeRawUnsafe(`
    INSERT INTO option_category (description) VALUES
    ('개인 정보 처리 방침')
  `);

  await prisma.$executeRawUnsafe(`
    INSERT INTO option_category (description) VALUES
    ('위치 정보 제공')
  `);

  await prisma.$executeRawUnsafe(`
    INSERT INTO option_category (description) VALUES
    ('마케팅 수신 동의')
  `);

  // food_category 삽입
  await prisma.$executeRawUnsafe(`
    INSERT INTO food_category (name) VALUES 
    ('한식'), ('일식'), ('중식'), ('양식'), ('치킨'), ('분식'), 
    ('고기/구이'), ('도시락'), ('야식(족발, 보쌈)'), 
    ('패스트푸드'), ('디저트'), ('아시안푸드')
  `);

  // address_category 삽입
  await prisma.$executeRawUnsafe(`
    INSERT INTO address_category (name) VALUES 
    ('은평구'), ('서대문구'), ('마포구'), ('강서구'), ('양천구'),
    ('구로구'), ('영등포구'), ('동작구'), ('금천구'), ('관악구'),
    ('종로구'), ('중구'), ('용산구'), ('강북구'), ('도봉구'),
    ('노원구'), ('성북구'), ('증링구'), ('동대문구'), ('성동구'),
    ('광진구'), ('강동구'), ('서초구'), ('강남구'), ('송파구')
  `);

  // alert_category 삽입
  await prisma.$executeRawUnsafe(`
    INSERT INTO alert_category (description) VALUES 
    ('새로운 이벤트 수신'), 
    ('리뷰 답변 알림'), 
    ('문의 내역 답변 알림')
  `);

  // inquire_category 삽입
  await prisma.$executeRawUnsafe(`
    INSERT INTO inquire_category (name) VALUES 
    ('계정'), ('포인트'), ('스토어'), ('미션'), 
    ('이벤트'), ('앱 사용'), ('리뷰'), ('기타')
  `);

  // store_category 삽입
  await prisma.$executeRawUnsafe(`
    INSERT INTO store_category (name) VALUES 
    ('한식당'), ('일식당'), ('중식당'), ('양식당 / 레스토랑'),
    ('치킨집 / 치킨전문점'), ('분식집 / 분식전문점'),
    ('고깃집 / 구이전문점'), ('도시락/간편식 전문점'),
    ('족발/보쌈 전문점'), ('패스트푸드점'), 
    ('카페/디저트 전문점'), ('아시안 레스토랑 / 퓨전 음식점')
  `);
}

main()
  .then(() => {
    console.log("🌱 Seed 완료!");
  })
  .catch((e) => {
    console.error("❌ Seed 중 오류 발생:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
