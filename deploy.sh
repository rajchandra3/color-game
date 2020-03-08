printf "Minifying css files in ./css folder...\n\n"
chmod +x ./scripts/minify_css.sh
./scripts/minify_css.sh
printf "Minified css files!\n\n"
while true; do
    read -p "Did you change the env in ./js/config.js file to production?" yn
    case $yn in
        [Yy]* ) 
            printf 'Awesome pushing production code to GitHub!\n\n'; 
            git add .
            git commit -m "$1"
            git push
            exit;;

        [Nn]* ) 
        printf "Aborting git commit! Please change env before pusing.\n\n"
        exit;;

        * ) 
        printf "Please answer yes or no.\n\n";;

    esac
done
