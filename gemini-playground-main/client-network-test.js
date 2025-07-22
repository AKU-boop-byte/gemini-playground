// 客户端网络测试脚本 - 在浏览器环境中运行
console.log('🔍 客户端网络环境测试...\n');

// 测试浏览器环境中的网络连接
async function testClientNetwork() {
    try {
        console.log('1. 测试浏览器网络连接...');
        
        // 测试百度地图API
        const apiKey = 'K0RhNE8R4HEF00DNhat61mmqaIlROWAL';
        const testUrl = `https://api.map.baidu.com/place/v2/search?query=北京大学&region=北京&output=json&ak=${apiKey}`;
        
        console.log('→ 测试URL:', testUrl);
        
        const response = await fetch(testUrl);
        console.log('→ HTTP状态:', response.status);
        
        if (response.ok) {
            const data = await response.json();
            console.log('→ API响应:', data);
            
            if (data.status === 0) {
                console.log('✅ 客户端网络连接正常');
                return true;
            }
        }
        
        console.log('❌ 客户端网络连接异常');
        return false;
        
    } catch (error) {
        console.error('❌ 客户端网络错误:', error.message);
        console.log('💡 可能原因:');
        console.log('   1. 浏览器CORS限制');
        console.log('   2. 防火墙阻止');
        console.log('   3. 网络代理设置');
        return false;
    }
}

// 测试CORS问题
async function testCORS() {
    try {
        console.log('\n2. 测试CORS问题...');
        
        // 使用无CORS限制的测试
        const img = new Image();
        img.src = 'https://api.map.baidu.com/images/cors-test.png';
        
        await new Promise((resolve, reject) => {
            img.onload = () => resolve(true);
            img.onerror = () => reject(new Error('CORS限制'));
        });
        
        console.log('✅ CORS测试通过');
        return true;
        
    } catch (error) {
        console.log('❌ CORS限制:', error.message);
        return false;
    }
}

// 运行测试
testClientNetwork().then(result => {
    console.log('\n🎯 客户端网络测试结果:', result ? '正常' : '异常');
});

// 导出测试函数
window.testClientNetwork = testClientNetwork;
