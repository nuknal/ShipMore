import type * as React from 'react';
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import TextLogo from '../text-logo';

type WelcomeEmailProps = {
  email: string;
  key: string;
  language: string;
};

export const WelcomeEmail = ({
  email,
  key,
  language,
}: WelcomeEmailProps) => {
  if (language === 'zh') {
    language = 'zh';
  }
  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                primary: {
                  50: '#F9F2EC',
                  100: '#F4E6D9',
                  200: '#ECC8AF',
                  300: '#E7AD99',
                  400: '#F39C9F',
                  500: '#D64541',
                  600: '#C76B5D',
                  700: '#B85A4C',
                  800: '#A44C3F',
                  900: '#8A3F35',
                },
                accent: {
                  orange: '#E67E22',
                  yellow: '#F4D03F',
                  gray: '#6C7A89',
                },
                offwhite: '#fafbfb',
              },
              spacing: {
                0: '0px',
                20: '20px',
                45: '45px',
              },
            },
          },
        }}
      >
        <Head />
        <Preview>{language === 'zh' ? '欢迎加入 KnowMoreWithAI 社区' : 'Welcome to KnowMoreWithAI'}</Preview>
        <Body className="bg-primary-50 font-sans text-base">
          <Container className="p-45 my-10 rounded-lg bg-white shadow-sm">
            <Section className="mb-8 text-center">
              <Heading className="my-0 text-2xl font-bold leading-8 text-primary-600">
                {language === 'zh' ? '欢迎加入' : 'Welcome to'}
                {' '}
                <TextLogo />
              </Heading>
              <Hr className="my-6 border-primary-100" />
            </Section>

            <Section>
              <Row>
                <Text className="text-accent-gray text-base leading-6">
                  {language === 'zh' ? '亲爱的用户，' : 'Dear User, '}
                </Text>
                <Text className="text-accent-gray text-base leading-6">
                  {language === 'zh' ? '感谢您订阅我们的邮件列表！我们非常高兴您能加入我们，一起探索 AI 如何帮助我们更好地理解世界。' : 'Thank you for subscribing to our mailing list! We are thrilled to have you join us, together exploring how AI can help us better understand the world.'}
                </Text>
                <Text className="text-accent-gray text-base leading-6">
                  {language === 'zh' ? '我们将向您发送最新动态、产品洞察和个性化推荐。敬请期待关于 KnowMoreWithAI 的精彩内容！' : 'We will send you the latest updates, product insights, and personalized recommendations. Stay tuned for exciting content about KnowMoreWithAI!'}
                </Text>
                <Text className="text-accent-gray text-base leading-6">
                  {language === 'zh' ? '如果您有任何问题或反馈，请随时与我们联系。我们期待与您共同成长。' : 'If you have any questions or feedback, please contact us. We look forward to growing together with you.'}
                </Text>
              </Row>
            </Section>

            <Section className="mt-8 text-center">
              <Button
                className="rounded-lg bg-primary-500 px-6 py-3 font-medium text-white transition-colors hover:bg-primary-600"
                href="https://knowmorewithai.com"
              >
                {language === 'zh' ? '探索更多' : 'Explore More'}
              </Button>
            </Section>
          </Container>

          <Container className="mt-4">
            <Section>
              <Row>
                <Column className="text-center">
                  <Link
                    href={`https://knowmorewithai.com/unsubscribe?email=${email}&key=${key}`}
                    className="text-accent-gray text-sm underline transition-colors hover:text-primary-500"
                  >
                    {language === 'zh' ? '取消订阅' : 'Unsubscribe'}
                  </Link>
                </Column>
              </Row>
            </Section>
            <Text className="text-accent-gray mb-45 mt-4 text-center text-xs">
              {new Date().getFullYear()}
              {' '}
              KnowMoreWithAI Inc.
              {language === 'zh' ? '保留所有权利' : 'All rights reserved'}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
