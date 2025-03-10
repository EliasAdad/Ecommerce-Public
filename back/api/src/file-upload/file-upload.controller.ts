import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileUploadService } from "./file-upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "src/auth/auth.guard";


@Controller('files')
export class FileUploadController {
    constructor(private fileUploadService: FileUploadService) { }

    @Post('uploadImage/:id')
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('file'))
    uploadImage(@UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({
                maxSize: 2000000,
                message: "Image can't be larger than 2mb"
            }),
            new FileTypeValidator({
                fileType: /(jpg|jpeg|png|webp)$/,
            }),
        ],
    })) file: Express.Multer.File, @Param('id', ParseUUIDPipe) productId: string) {

        return this.fileUploadService.uploadImage(file, productId)
    }
}