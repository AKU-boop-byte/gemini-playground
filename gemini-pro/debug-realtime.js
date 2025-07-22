// 实时调试工具调用流程
import { ToolManager } from './src/static/js/tools/tool-manager.js';
import { BaiduMapTool } from './src/static/js/tools/baidu-map-tool.js';

console.log('🔍 开始实时调试百度地图工具调用流程...\n');

// 创建工具管理器实例
const toolManager = new ToolManager();

// 1. 检查工具声明
console.log('📋 检查工具声明:');
const declarations = toolManager.getToolDeclarations();
console.log(`工具总数: ${declarations[0].functionDeclarations.length}`);
declarations[0].functionDeclarations.forEach((tool, index) => {
    console.log(`  ${index + 1}. ${tool.name}: ${tool.description}`);
});

// 2. 模拟用户提问"北京大学在哪里"
console.log('\n🎯 模拟用户提问: "北京大学在哪里"');
const mockFunctionCall = {
    name: 'get_location_info',
    args: { query: '北京大学', region: '北京' },
    id: 'test-001'
};

// 3. 测试工具调用
console.log('\n🔧 测试工具调用流程:');
async function testToolCall() {
    try {
        console.log('→ 调用工具管理器...');
        const result = await toolManager.handleToolCall(mockFunctionCall);
        
        console.log('→ 工具调用结果:');
        if (result.functionResponses && result.functionResponses[0]) {
            const response = result.functionResponses[0].response;
            if (response.output) {
                console.log('✅ 成功获取数据');
                const data = response.output;
                if (data.results && data.results.length > 0) {
                    const first = data.results[0];
                    console.log(`   名称: ${first.name}`);
                    console.log(`   地址: ${first.address}`);
                    console.log(`   坐标: ${first.location.lat}, ${first.location.lng}`);
                }
            } else if (response.error) {
                console.log(`❌ 错误: ${response.error}`);
            }
        }
    } catch (error) {
        console.log(`❌ 工具调用失败: ${error.message}`);
    }
}

// 4. 测试直接工具调用
console.log('\n🎯 测试直接工具调用:');
async function testDirectTool() {
    const baiduTool = new BaiduMapTool();
    try {
        console.log('→ 直接调用百度地图工具...');
        const result = await baiduTool.execute({ query: '北京大学', region: '北京' });
        
        if (result.results && result.results.length > 0) {
            console.log('✅ 直接调用成功');
            const first = result.results[0];
            console.log(`   名称: ${first.name}`);
            console.log(`   地址: ${first.address}`);
            console.log(`   坐标: ${first.location.lat}, ${first.location.lng}`);
            console.log(`   电话: ${first.telephone || '无'}`);
        } else {
            console.log('❌ 直接调用无结果');
        }
    } catch (error) {
        console.log(`❌ 直接调用失败: ${error.message}`);
    }
}

// 5. 检查工具映射
console.log('\n🔍 检查工具名称映射:');
console.log('工具映射规则:');
console.log('  - get_location_info → baiduMap');
console.log('  - get_driving_directions → baiduMap');
console.log('  - get_current_gps_location → gps');

// 执行测试
async function runTests() {
    await testToolCall();
    await testDirectTool();
    
    console.log('\n✅ 调试完成！');
    console.log('💡 如果模型说"无法查找"，可能原因:');
    console.log('   1. 工具名称映射不正确');
    console.log('   2. API响应格式问题');
    console.log('   3. 网络连接问题');
    console.log('   4. 模型未正确触发工具调用');
}

runTests();
