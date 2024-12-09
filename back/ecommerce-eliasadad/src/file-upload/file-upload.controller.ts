import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileUploadService } from "./file-upload.service";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller('files')
export class FileUploadController {
    constructor(private fileUploadService: FileUploadService) { }

    @Post('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({
                maxSize: 2000000,
                message: "Image can't be larger than 200kb"
            }),
            new FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp)$/,
            }),
        ],
    })) file: Express.Multer.File, @Param('id') id: string) {

        return this.fileUploadService.uploadImage(file, id)
    }
}