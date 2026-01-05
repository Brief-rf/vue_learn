<<template>
    <div class="outer">
        <span class="m-4">
            运动旅行
        </span>
        <div class="ttt">
            <el-icon class="m-2 cursor-pointer text-4xl text-blue-400">
                <Edit />
                <Close />
            </el-icon>
            <!-- <el-icon class="m-2 cursor-pointer">
                
            </el-icon> -->
        </div>
    </div>

</template>


<style>
.outer:hover{
    background-color: aliceblue;
}
.outer{
    
    height: 50px;
    @apply rounded flex items-center
}
    .ttt {
        display: inline;
        @apply ml-auto 
    }
</style>