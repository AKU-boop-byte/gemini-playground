/**
 * 检查Google Gemini API工具声明格式
 * 根据最新API文档调整格式
 */

import { GoogleSearchTool } from './src/static/js/tools/google-search.js';
import { WeatherTool } from './src/static/js/tools/weather-tool.js';
import { BaiduMapTool } from './src/static/js/tools/baidu-map-tool.js';

function checkApiFormat() {
    console.log('🔍 检查Google Gemini API工具声明格式...\n');
    
    // 获取所有工具声明
    const tools = [
        new GoogleSearchTool(),
        new WeatherTool(),
        new BaiduMapTool()
    ];
    
    // 按照Google Gemini API的正确格式组合
    const functionDeclarations = [];
    
    tools.forEach(tool => {
        const declarations = tool.getDeclaration();
        functionDeclarations.push(...declarations);
    });
    
    // 正确的API格式
    const correctFormat = {
        setup: {
            model: "models/gemini-2.0-flash-exp",
            tools: [{
                functionDeclarations: functionDeclarations
            }]
        }
    };
    
    console.log('✅ 正确的API格式:');
    console.log(JSON.stringify(correctFormat, null, 2));
    
    // 检查每个函数名
    console.log('\n🔍 函数名验证:');
    functionDeclarations.forEach((func, index) => {
        console.log(`${index + 1}. ${func.name} - ${/^[a-zA-Z]/.test(func.name) ? '✅ 有效' : '❌ 无效'}`);
    });
    
    return correctFormat;
}

// 运行检查
checkApiFormat();
