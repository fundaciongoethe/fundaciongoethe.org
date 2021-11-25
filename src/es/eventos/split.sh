#!/bin/bash
# That tells Linux to use a Bourne shell interpreter.

# Run this script from the current directory. (Required on OSX.)
cd -- "$(dirname "$0")"

# Don't echo these commands.
set +v

# Get the filename from the user.
echo "Enter the file name to split: "
read filename
echo 'Splitting' $filename ' ...'

# Replace the first of each set of YAML frontmatter
# with a string delimiter we can replace later.
# This is necessary because csplit can only search
# one line at a time.
perl -i -0pe 's/(^---$)(.+?)(^---$)/---thisisnotthreehyphens$2---/gms' $filename

# Get the number of splits we're going to do.
frontmatter=$(grep -c "^\-\-\-thisisnotthreehyphens$" "$filename")
echo 'Found' $frontmatter 'markdown docs.'

# Set the number of times we'll repeat the csplit.
# This should be one less than the number of frontmatters.
csplitRepeats=$(($frontmatter-1))

# Split the file at the delimiter we just created.
csplit -ks $filename '/---thisisnotthreehyphens/' {$csplitRepeats}

# In the original file and the files we just created,
# remove the string we put there as a delimiter.
perl -i -pe 's/---thisisnotthreehyphens/---/' $filename

# Remove the first, blank file. (We assume there is
# nothing before our first '---' that we want to keep.)
rm xx00

# Put back the '---' in the files we created, and rename them.
for file in xx*
    do
        perl -i -pe 's/---thisisnotthreehyphens/---/' $file
        newFilename=${file/xx/}.md
        mv "$file" "$newFilename"
        echo 'Created' $newFilename
    done

# All done!
echo 'Done!'