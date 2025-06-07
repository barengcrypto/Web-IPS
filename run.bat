@echo off
echo Menjalankan Web IPS...
echo.
echo Buka browser dan akses http://localhost:8000
echo Tekan Ctrl+C untuk menghentikan server
echo.
python -m http.server 8000
pause 