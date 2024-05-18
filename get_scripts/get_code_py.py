import os

def find_and_save_files(root_dir, target_files, output_file, exclude_dirs):
    with open(output_file, 'w') as outfile:
        for subdir, dirs, files in os.walk(root_dir):
            # Skip directories that should be excluded
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            for file in files:
                filepath = os.path.join(subdir, file)
                if file.endswith('py'):
                    # Write file path header with additional line spaces for clarity
                    outfile.write(f"------------------------------------------------\n")
                    outfile.write(f"#{filepath}\n\n")
                    with open(filepath, 'r') as infile:
                        contents = infile.read()
                        # Include content and ensure there are blank lines before end of file marker
                        outfile.write(contents.strip() + "\n\n")
                    # Ensure separation between entries
                    outfile.write("\n------------------------------------------------\n\n")

# Set the directory from which to start the search, the target file types and the output file name
root_directory = '/Users/ron/Documents/projects/vite-react-python/backend'  # Adjust as needed
target_files = ['py']
output_filename = 'got_code.txt'
excluded_directories = ['venv', 'node_modules', 'tests']  # Add more as needed

find_and_save_files(root_directory, target_files, output_filename, excluded_directories)
