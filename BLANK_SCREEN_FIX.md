# BLANK SCREEN FIX

## ROOT CAUSE
The Gemini API service was using incorrect environment variable access causing initialization errors.

## FIXES APPLIED

1. **geminiService.ts** - Fixed API key access to use `process.env.GEMINI_API_KEY`
2. **geminiService.ts** - Updated model names from `gemini-3-flash-preview` to `gemini-2.0-flash-exp`
3. **.env.local** - Set correct variable name `GEMINI_API_KEY`

## TO RUN

1. Add your Gemini API key to `.env.local`:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

2. Restart the dev server:
   ```
   npm run dev
   ```

3. Or use start-app.bat to run both frontend and backend

## WHAT WAS WRONG
- Environment variable mismatch between vite.config and service
- Invalid Gemini model names
- API initialization failing silently causing blank render
