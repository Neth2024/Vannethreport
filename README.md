# Nol Vanneth Sales — Telegram Mini App V1

Telegram Mini App for sales logging with Telegram Stars Premium.

## Included
- Khmer mobile-first sales UI
- 20kg / 25kg / 30kg / 2kg products
- Quantity 1–10,000
- Local sales storage for V1
- Daily and monthly totals
- Telegram Stars invoice endpoint
- Telegram WebApp initData validation

## Run
```bash
npm install
BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN npm start
```

## Telegram setup
1. Create a bot with @BotFather.
2. Set the Mini App URL to the public HTTPS URL of this server.
3. Keep `BOT_TOKEN` only in server environment variables; never put it in `index.html`.
4. The payment endpoint uses Telegram Stars (`XTR`) and a 150-Star Pro plan in V1.

## Production next steps
- Add persistent database (PostgreSQL/Supabase)
- Add payment webhook / successful-payment persistence
- Add user/subscription table and expiry handling
- Add admin dashboard
- Add Excel export
- Add Google Sheets sync
- Deploy backend to a public HTTPS host
