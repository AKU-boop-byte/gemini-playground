// WebSocket调试工具
class WebSocketDebugger {
    constructor() {
        this.logs = [];
    }

    log(message, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
        this.logs.push(logEntry);
        console.log(logEntry);
    }

    async testConnection(apiKey, model = 'models/gemini-2.5-pro-exp-0827') {
        this.log('开始测试WebSocket连接...');
        
        const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${apiKey}`;
        
        return new Promise((resolve, reject) => {
            const ws = new WebSocket(wsUrl);
            
            ws.onopen = () => {
                this.log('WebSocket连接成功建立');
                
                // 发送最简化的配置
                const setupMessage = {
                    setup: {
                        model: model
                    }
                };
                
                ws.send(JSON.stringify(setupMessage))
            };
            
            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.log('收到消息: ' + JSON.stringify(data, null, 2));
                    
                    if (data.setupComplete) {
                        this.log('Setup完成，连接正常');
                        ws.close();
                        resolve(true);
                    } else if (data.error) {
                        this.log('收到错误: ' + JSON.stringify(data.error), 'error');
                        ws.close();
                        reject(data.error);
                    }
                } catch (e) {
                    this.log('收到原始消息: ' + event.data, 'warn');
                }
            };
            
            ws.onclose = (event) => {
                this.log(`连接关闭: code=${event.code}, reason="${event.reason}"`);
                if (event.code !== 1000) {
                    reject(new Error(`连接异常关闭: ${event.reason}`));
                }
            };
            
            ws.onerror = (error) => {
                this.log('连接错误: ' + error, 'error');
                reject(error);
            };
            
            // 10秒后超时
            setTimeout(() => {
                ws.close();
                reject(new Error('连接超时'));
            }, 10000);
        });
    }

    async testLocalProxy(apiKey, model = 'models/gemini-2.5-pro-exp-0827') {
        this.log('开始测试本地代理连接...');
        
        const wsUrl = `ws://localhost:8000/ws?key=${apiKey}`;
        
        return new Promise((resolve, reject) => {
            const ws = new WebSocket(wsUrl);
            
            ws.onopen = () => {
                this.log('本地代理连接成功建立');
                
                const setupMessage = {
                    setup: {
                        model: model
                    }
                };
                
                ws.send(JSON.stringify(setupMessage));
                this.log('已发送简化配置: ' + JSON.stringify(setupMessage));
            };
            
            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    this.log('收到消息: ' + JSON.stringify(data, null, 2));
                    
                    if (data.setupComplete) {
                        this.log('Setup完成，本地代理正常');
                        ws.close();
                        resolve(true);
                    } else if (data.error) {
                        this.log('收到错误: ' + JSON.stringify(data.error), 'error');
                        ws.close();
                        reject(data.error);
                    }
                } catch (e) {
                    this.log('收到原始消息: ' + event.data, 'warn');
                }
            };
            
            ws.onclose = (event) => {
                this.log(`连接关闭: code=${event.code}, reason="${event.reason}"`);
                if (event.code !== 1000) {
                    reject(new Error(`连接异常关闭: ${event.reason}`));
                }
            };
            
            ws.onerror = (error) => {
                this.log('连接错误: ' + error, 'error');
                reject(error);
            };
            
            setTimeout(() => {
                ws.close();
                reject(new Error('连接超时'));
            }, 10000);
        });
    }

    getLogs() {
        return this.logs.join('\n');
    }
}

// 使用示例
window.WebSocketDebugger = WebSocketDebugger;
