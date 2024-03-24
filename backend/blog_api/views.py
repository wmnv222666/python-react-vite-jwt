from rest_framework import generics
from blog.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import (
    SAFE_METHODS,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    BasePermission,
    IsAdminUser,
    DjangoModelPermissions,
    AllowAny,
)

class PostUserWritePermission(BasePermission):
    message = "Editing posts is restricted to the author only."

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user


class PostList(generics.ListCreateAPIView):
    # permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # class ModifyView(APIView):
    # permission_classes = [IsAuthenticated]  # 仅允许已认证的用户访问

    # def post(self, request):
    #     # 创建新资源的逻辑

    # def put(self, request, pk):
    #     # 更新现有资源的逻辑

    # def delete(self, request, pk):
    #     # 删除现有资源的逻辑


class PostDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [PostUserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
