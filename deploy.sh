echo "Minifying css files in ./css folder..."
chmod +x ./scripts/minify_css.sh
./scripts/minify_css.sh
echo "Minified css files!"
while true; do
    read -p "Did you change the env in ./js/config.js file to production?" yn
    case $yn in
        [Yy]* ) 
            echo 'Awesome pushing production code to GitHub!'; 
            git add .
            git commit -m "$1"
            git push
            break;;
        [Nn]* ) 
        echo "Aborting git commit! Please change env before pusing."
        exit;;
        * ) echo "Please answer yes or no.";;
    esac
done
