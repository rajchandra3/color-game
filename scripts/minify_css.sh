# Created by Raj Chandra
# This script minifies css files by removing tailing spaces and new lines

for file in ./css/*
do
    echo "@$file"
    #get filename
    filename="$(basename -- $file)"
    echo "file name : ${filename}"

    #get file extension and name
    ext="${filename##*.}"
    name="$(basename -- $file ".${ext}")"
    printf "name: $name \nextention: $ext\n"

    #create file location
    current_dir=$(dirname $file)
    mkdir $current_dir/min
    if [ "$name" = "min" ]; then
        echo "Not a css file"
    else
        destination="$current_dir/min/${name}."min".${ext}"
        printf "$current_dir $destination\n"

        #get file content 
        file_content=`cat $file` 

        #get minified file
        echo $"${file_content}" | xargs | tr -d "\r\n" > "$destination"
    fi
    printf "\n\n" 
    # | sed 's:["\*]:\\&:g' remove escape characters
    # echo "${file_content}" | tr -d " \t\n\r" > "$destination"
    # echo "${file_content}" | tr -d "[:blank:]" > "$destination"
    
done