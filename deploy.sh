printf "Minifying css files in ./css folder...\n\n"
chmod +x ./scripts/minify_css.sh
./scripts/minify_css.sh
printf "Minified css files!\n\n"

printf 'Awesome pushing production code to GitHub!\n\n'; 
git add .
git commit -m "$1"
git push
