/**
 * 详细调试工具声明
 * 检查工具声明的完整结构
 */

import { ToolManager } from './src/static/js/tools/tool-manager.js';

function debugToolDeclarations() {
    const toolManager = new ToolManager();
    const declarations = toolManager.getToolDeclarations();
    
    console.log('🔍 详细工具声明调试...\n');
    console.log('📋 工具声明总数:', declarations.length);
    
    declarations.forEach((declaration, index) => {
        console.log(`\n📦 工具声明 #${index + 1}:`);
        console.log('结构:', JSON.stringify(declaration, null, 2));
        
        if (declaration.functionDeclarations) {
            console.log(`\n🔧 函数声明数量: ${declaration.functionDeclarations.length}`);
            
            declaration.functionDeclarations.forEach((func, funcIndex) => {
                console.log(`\n  函数 #${funcIndex + 1}:`);
                console.log(`  名称: "${func.name}"`);
                console.log(`  描述: "${func.description}"`);
                console.log(`  名称验证:`);
                console.log(`    - 以字母开头: ${/^[a-zA-Z]/.test(func.name)}`);
                console.log(`    - 只包含合法字符: ${/^[a-zA-Z0-9_]+$/.test(func.name)}`);
                console.log(`    - 名称长度: ${func.name.length}`);
                console.log(`    - 名称字符:`, func.name.split('').map(c => `${c}(${c.charCodeAt(0)})`).join(', '));
            });
        }
    });
    
    // 检查最终发送到API的格式
    console.log('\n📤 最终发送到API的格式:');
    const finalConfig = {
        setup: {
            model: 'models/gemini-2.0-flash-exp',
            tools: declarations
        }
    };
    console.log(JSON.stringify(finalConfig, null, 2));
}

// 运行调试
debugToolDeclarations();
