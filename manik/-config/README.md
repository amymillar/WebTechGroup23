to run linters:

make sure you have visual studio build tools installed and node.js latest version or anything over v10 i think should work
open vs build tools cmd 20XX
cd to the project folder for me it is:
    C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools>cd C:\Users\Manik Khadiya\Documents\GitHub\webtechg23
then to run hte linter use the following command but replace the path acordingly:
    C:\Users\Manik Khadiya\Documents\GitHub\webtechg23>npx eslint -c .config/eslint.config.js src/scripts/**/*.js --fix
then you should see errors n waht not pop up
later i will make a runner/task/job that you can use by pressing a keybind. this should impres our marker and also we should be learning this at uni and not basic shit liek what were doing.