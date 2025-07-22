import React from 'react';
import { Typography, Row, Col } from 'antd';
import './App.css'; // 引入样式文件


const App = () => {
    return (
        <div className="app-container">
            {/* 使用指南标题 */}
            <Row>
                <Col span={24}>
                    <Typography.Title level={3} className="title-with-fireworks">
                        使用指南
                    </Typography.Title>
                </Col>
            </Row>

            {/* ... existing code ... */}
        </div>
    );
};

export default App;