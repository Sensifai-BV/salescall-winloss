import asyncio
import os
import shutil
from playwright.async_api import async_playwright

async def main():
    os.makedirs("media/screenshots", exist_ok=True)
    os.makedirs("public/images", exist_ok=True)

    async with async_playwright() as p:
        chrome_path = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
        if os.path.exists(chrome_path):
            browser = await p.chromium.launch(executable_path=chrome_path, headless=True)
        else:
            browser = await p.chromium.launch(headless=True)
        
        # 1. Desktop 1280x720 (16:9) of /workspace
        context_desktop = await browser.new_context(viewport={"width": 1280, "height": 720})
        page_desktop = await context_desktop.new_page()
        print("Navigating to http://localhost:3000/workspace (Desktop)...")
        await page_desktop.goto("http://localhost:3000/workspace", wait_until="networkidle")
        await page_desktop.wait_for_timeout(2500)

        desktop_path = "media/screenshots/desktop-1280.png"
        await page_desktop.screenshot(path=desktop_path)
        print(f"Captured: {desktop_path}")

        # Copy to required locations
        shutil.copy(desktop_path, "media/platform-mockup.png")
        shutil.copy(desktop_path, "public/images/platform-ui.png")
        print("Copied to media/platform-mockup.png and public/images/platform-ui.png")

        # 2. Tablet 768x1024 of /workspace
        context_tablet = await browser.new_context(viewport={"width": 768, "height": 1024})
        page_tablet = await context_tablet.new_page()
        print("Navigating to http://localhost:3000/workspace (Tablet)...")
        await page_tablet.goto("http://localhost:3000/workspace", wait_until="networkidle")
        await page_tablet.wait_for_timeout(1500)

        tablet_path = "media/screenshots/tablet-768.png"
        await page_tablet.screenshot(path=tablet_path)
        print(f"Captured: {tablet_path}")

        # 3. Mobile 375x812 of /workspace
        context_mobile = await browser.new_context(viewport={"width": 375, "height": 812})
        page_mobile = await context_mobile.new_page()
        print("Navigating to http://localhost:3000/workspace (Mobile)...")
        await page_mobile.goto("http://localhost:3000/workspace", wait_until="networkidle")
        await page_mobile.wait_for_timeout(1500)

        mobile_path = "media/screenshots/mobile-375.png"
        await page_mobile.screenshot(path=mobile_path)
        print(f"Captured: {mobile_path}")

        await browser.close()
        print("All screenshots successfully captured!")

if __name__ == "__main__":
    asyncio.run(main())
