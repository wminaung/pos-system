import { Box } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileSelected: (acceptedFiles: File[]) => void;
}

const FileDropZone = ({ onFileSelected }: Props) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFileSelected(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
    });

  return (
    <Box
      {...getRootProps()}
      sx={{
        borderRadius: 4,
        border: "3px dotted lightgray",
        textAlign: "center",
        p: 1,
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {acceptedFiles.length ? (
        <img src={URL.createObjectURL(acceptedFiles[0])} alt="safj" />
      ) : (
        ""
      )}
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </Box>
  );
};

export default FileDropZone;
