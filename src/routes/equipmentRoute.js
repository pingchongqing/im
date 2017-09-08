const Header = resolve => {
    require.ensure(['components/Header.vue'], () => {
        resolve(require('components/Header.vue'));
    }, 'Home');
};

const Equipment = resolve => {
    require.ensure([], () => {
        resolve(require('components/equipment/Equipment.vue'));
    }, 'equipment');
}

const EquipmentDetail = resolve => {
    require.ensure([], () => {
        resolve(require('components/equipment/EquipmentDetail.vue'));
    }, 'equipment');
}

const EquipmentOrder = resolve => {
    require.ensure([], () => {
        resolve(require('components/equipment/EquipmentOrder.vue'));
    }, 'equipment');
}

const EquipmentMOrder = resolve => {
    require.ensure([], () => {
        resolve(require('components/equipment/EquipmentMOrder.vue'));
    }, 'equipment');
}

const EquipmentSearch = resolve => {
    require.ensure([], () => {
        resolve(require('components/choice/EquipmentSearch.vue'));
    }, 'equipment');
}





export const equipmentRoute =

    {
        path: '/vue/equipment',
        components: {
            default: Equipment,
        },
        children: [
            {
                path: 'equipmentDetail/:goodsId/:goods_source_type/:gameType',
                name:'equipmentDetail',
                components: {
                    default: EquipmentDetail,
                    'equipment-header': Header
                }
            },
            {
                path: 'equipmentOrder/:goodsId/:goods_source_type',
                name:'equipmentOrder',
                components: {
                    default: EquipmentOrder
                },
                meta: {isPublish: true, requireAuth: true}
            },
            {
                path: 'equipmentMOrder/:goodsId/:goods_source_type',
                name:'equipmentMOrder',
                components: {
                    default: EquipmentMOrder
                },
                meta: {isPublish: true, requireAuth: true}
            },
            {
                path: 'equipmentSearch',
                name:'equipmentSearch',
                components: {
                    default: EquipmentSearch
                },
                meta: {isPublish: true, requireAuth: false}
            },
            {
                path: 'equipmentDetailApp/:goodsId/:goods_source_type/:gameType',
                name:'equipmentDetailApp',
                components: {
                    default: EquipmentDetail,
                }
            },

        ],
        meta: {isPublish: true, requireAuth: false}
    };
