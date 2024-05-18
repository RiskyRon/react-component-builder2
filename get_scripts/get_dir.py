import subprocess

def tree_exclude(directory='.'):
    """
    Runs the tree command to display the directory structure excluding 'node_modules' and 'venv' directories.

    Args:
    directory (str): The directory path for which to display the tree. Defaults to the current directory.
    """
    try:
        # Prepare the command
        command = ['tree', '-I', 'node_modules|venv', directory]
        
        # Run the command
        result = subprocess.run(command, check=True, capture_output=True, text=True)
        
        # Print the output
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"An error occurred: {e}")
    except FileNotFoundError:
        print("The 'tree' command is not installed or not found in the PATH.")

# Example usage
tree_exclude('/Users/ron/Documents/projects/vite-react-python')
