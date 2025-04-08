import { Layout, Row, Col, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer = () => {
    return (
        <AntFooter style={{ background: '#f0f2f5', padding: '24px 0' }}>
            <Row justify="center" align="middle" gutter={[0, 16]}>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <Text strong>My Application</Text>
                </Col>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <Text type="secondary">
                        ©{new Date().getFullYear()} Created with{' '}
                        <Link href="https://ant.design" target="_blank">
                            Ant Design
                        </Link>
                    </Text>
                </Col>
            </Row>
        </AntFooter>
    );
};

export default Footer;
