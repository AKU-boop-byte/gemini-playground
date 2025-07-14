# Gemini 2.5 Playground

[中文版](README.MD)

### Author: Tech Shrimp
Available on Bilibili, YouTube, Douyin, and WeChat Official Account under the same name. Please credit the author when reposting.

## Project Overview
#### Demo: [https://play.210718.xyz](https://play.210718.xyz)
Deploy a Gemini multimodal chat website in 10 seconds with just a Gemini API Key.
Accessible from any region/network environment, ready to use immediately.
Free serverless deployment using Deno/Cloudflare Worker.
Converts Gemini Chat API to the more universal OpenAI format, accessible directly within China.
Compatible with AI programming, can be integrated with ChatBox and other AI clients.

## Deno Deployment (Recommended)

1. [Fork](https://github.com/tech-shrimp/gemini-playground/fork) this project
2. Login/Register at https://dash.deno.com/
3. Create a project at https://dash.deno.com/new_project
4. Select this project, enter project name (please choose carefully as it affects the auto-assigned domain)
5. Set Entrypoint to `src/deno_index.ts`, leave other fields empty
   <details>
   <summary>See image</summary>
   
   ![image](/docs/images/1.png)
   </details>
6. Click <b>Deploy Project</b>
7. After successful deployment, you'll get a domain name. The site is ready to use, and the domain can also be used as a Chat API proxy.

## Cloudflare Worker Deployment

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/tech-shrimp/gemini-playground)
1. Click the deploy button
2. Login to your Cloudflare account
3. Enter Account ID and API Token
4. Fork this project, enable Github Action
5. Deploy, open dash.cloudflare.com to view the deployed worker
6. For use in China, a custom domain name needs to be bound
   <details>
   <summary>See image</summary>
   
   ![image](/docs/images/3.png)
   </details>
> When using Cloudflare in China, you might encounter "400: User location is not supported for the API use." This might be due to Cloudflare routing to Hong Kong CDN nodes in the Guangdong-Hong Kong region. Recommend switching to Deno deployment.

## Local Development

Install Deno on Windows:
> irm https://deno.land/install.ps1 | iex

Install Deno on Mac/Linux:
> curl -fsSL https://deno.land/install.sh | sh

Start the project:

>cd project_directory <br>
>deno run --allow-net --allow-read src/deno_index.ts

## Usage
### Multimodal Chat
Enter API Key, click Connect button to start chatting.
The three buttons are for:
- Enable microphone
- Enable camera
- Share screen
<br>
![image](/docs/images/2.png)

### API Proxy
The API has been proxied to OpenAI format and can be used directly with OpenAI format API.
Remember to replace the domain and Gemini API Key.

### Curl:

Available models:
```
curl --location 'http://your.domain.com/v1/models' \
--header 'Authorization: Bearer YOUR-GEMINI-API-KEY'
```

Chat:
```
curl --location 'https://your.domain.com/v1/chat/completions' \
--header 'Authorization: Bearer YOUR-GEMINI-API-KEY' \
--header 'Content-Type: application/json' \
--data '{
    "messages": [
        {
            "role": "system",
            "content": "You are a test assistant."
        },
        {
            "role": "user",
            "content": "Testing. Just say hi and nothing else."
        }
    ],
    "model": "gemini-2.5-flash"
}'
```
### ChatBOX：
   <details>
   <summary>See image</summary>
   
   ![image](/docs/images/4.png)
   </details>

### Cursor Programming：
   <details>
   <summary>See image</summary>
   
   ![image](/docs/images/5.png)
   </details>

## Acknowledgments/References:

Website UI: 
```
Author: ChrisKyle
Project: https://github.com/ViaAnthroposBenevolentia/gemini-2-live-api-demo
MIT License : https://github.com/ViaAnthroposBenevolentia/gemini-2-live-api-demo/blob/main/LICENSE
```

Gemini to OpenAI format conversion: 
```
Author: PublicAffairs
Project: https://github.com/PublicAffairs/openai-gemini
MIT License : https://github.com/PublicAffairs/openai-gemini/blob/main/LICENSE
``` 