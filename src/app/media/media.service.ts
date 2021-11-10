import { Injectable } from '@nestjs/common';
import { createImageURL } from 'src/multer/multerOptions';

@Injectable()
export class MediaService {
  async uploadFiles(files: File[], type: string): Promise<string[]> {
    const generatedFiles: string[] = [];

    for (const file of files) {
      console.log(file['filename']);
      generatedFiles.push('12');
    }
    return generatedFiles;
  }
}
