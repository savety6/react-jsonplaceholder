import { Menu, Row, Col, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header = () => {
    const menuItems = [
        {
            key: 'home',
            label: <Link to="/">Home</Link>
        },
        {
            key: 'todo',
            label: <Link to="/todo">ToDo</Link>
        }
    ];

    return (
        <AntHeader>
            <Row justify="space-between" align="middle">
                <Col>
                    <h1 style={{ color: '#fff', margin: 0 }}>LOGO</h1>
                </Col>
                <Col>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={menuItems}
                        style={{ minWidth: 200 }}
                    />
                </Col>
            </Row>
        </AntHeader>
    );
};

export default Header;
