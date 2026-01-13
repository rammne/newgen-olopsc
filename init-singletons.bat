@echo off
echo Initializing Singleton Documents...
cd apps/studio

echo Creating computingStudies...
call npx sanity documents create --id computingStudies --replace --json "{\"_type\": \"computingStudies\", \"title\": \"College of Computer Studies\"}"

echo Creating tourismManagement...
call npx sanity documents create --id tourismManagement --replace --json "{\"_type\": \"tourismManagement\", \"title\": \"College of Tourism Management\"}"

echo Creating hospitalityManagement...
call npx sanity documents create --id hospitalityManagement --replace --json "{\"_type\": \"hospitalityManagement\", \"title\": \"College of Hospitality Management\"}"

echo Creating businessAdmin...
call npx sanity documents create --id businessAdmin --replace --json "{\"_type\": \"businessAdmin\", \"title\": \"College of Business Administration\"}"

echo Creating educationLiberalArts...
call npx sanity documents create --id educationLiberalArts --replace --json "{\"_type\": \"educationLiberalArts\", \"title\": \"College of Education & Liberal Arts\"}"

echo Creating entrepreneurship...
call npx sanity documents create --id entrepreneurship --replace --json "{\"_type\": \"entrepreneurship\", \"title\": \"College of Entrepreneurship\"}"

echo Done! Refresh your Studio.
pause
