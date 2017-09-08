/**
 * Created by Administrator on 2017/7/19. 消息页面
 */
const message = resolve => {
    require.ensure(['components/my/message/message.vue'], () => {
        resolve(require('components/my/message/message.vue'));
    }, 'message');
}
export const mess = {
    path: '/vue/message',
    component: message,
    meta: {isPublish: true, requireAuth: true}
}