#!/usr/bin/env python3
import json
import os
import re
import subprocess
import sys
import argparse
from pathlib import Path

def load_translation_file(file_path):
    """加载翻译文件并返回JSON对象"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def get_all_keys(obj, prefix=''):
    """递归获取所有翻译键"""
    keys = []
    for key, value in obj.items():
        current_key = f"{prefix}.{key}" if prefix else key
        if isinstance(value, dict):
            # 递归处理嵌套对象
            keys.extend(get_all_keys(value, current_key))
        else:
            # 叶子节点，添加完整路径
            keys.append(current_key)
    return keys

def generate_key_variations(key):
    """生成键的所有可能变体"""
    parts = key.split('.')
    variations = []
    
    # 添加完整键
    variations.append(key)
    
    # 添加所有可能的子路径
    for i in range(1, len(parts)):
        variation = '.'.join(parts[i:])
        variations.append(variation)
    
    # 添加最后一个部分（最短路径）
    if len(parts) > 1:
        variations.append(parts[-1])
    
    return variations

def find_files_with_namespace(namespace, search_dirs):
    """查找使用特定命名空间的文件"""
    escaped_namespace = namespace.replace('.', '\\.')
    pattern = f"useTranslations\\(['\"`]{escaped_namespace}['\"`]\\)"
    
    try:
        cmd = ['grep', '-r', '-l', pattern, '--include=*.ts', '--include=*.tsx', '--include=*.js', '--include=*.jsx'] + search_dirs
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode == 0:
            return [line for line in result.stdout.split('\n') if line]
        return []
    except Exception as e:
        print(f"查找命名空间 '{namespace}' 时出错: {e}")
        return []

def search_key_in_namespace_files(key, namespace_files):
    """在使用特定命名空间的文件中搜索键"""
    if not namespace_files:
        return False
    
    # 获取键的最后部分
    last_part = key.split('.')[-1]
    
    patterns = [
        f't\\(["\']({last_part})["\']\\)',  # t('key') 或 t("key")
        f't\\(`{last_part}`\\)',           # t(`key`)
        f'{{t\\(["\']({last_part})["\']\\)}}',  # {t('key')} 在JSX中
        f'=\\{{t\\(["\']({last_part})["\']\\)\\}}',  # ={t('key')} 属性值
    ]
    
    for file_path in namespace_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                for pattern in patterns:
                    if re.search(pattern, content):
                        return True
        except Exception as e:
            print(f"读取文件 {file_path} 时出错: {e}")
    
    return False

def search_key_in_codebase(key, search_dirs):
    """在代码库中搜索键"""
    # 转义特殊字符
    escaped_key = key.replace('.', '\\.').replace('[', '\\[').replace(']', '\\]')
    
    # 不同的搜索模式
    patterns = [
        f'"{escaped_key}"',           # 直接字符串引用
        f"'{escaped_key}'",           # 单引号字符串
        f"`{escaped_key}`",           # 模板字符串
        f't\\(["\']({escaped_key})["\']\\)',  # t('key') 或 t("key")
        f't\\(`{escaped_key}`\\)',    # t(`key`)
        f'\\{{t\\(["\']({escaped_key})["\']\\)\\}}',  # {t('key')} 在JSX中
        f'=\\{{t\\(["\']({escaped_key})["\']\\)\\}}',  # ={t('key')} 属性值
    ]
    
    for pattern in patterns:
        try:
            # 使用grep搜索，排除翻译文件
            cmd = ['grep', '-r', pattern, '--include=*.ts', '--include=*.tsx', '--include=*.js', '--include=*.jsx'] + search_dirs
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            # 排除locales目录中的匹配
            if result.returncode == 0:  # 找到匹配项
                # 过滤掉翻译文件中的匹配
                filtered_results = [line for line in result.stdout.split('\n') if line and 'locales/' not in line]
                if filtered_results:
                    return True
        except Exception as e:
            print(f"搜索键 '{key}' 时出错: {e}")
    
    return False

def check_dynamic_array_keys(key, search_dirs):
    """检查动态数组索引的键，如items.0.title => items.[0-9]+.title"""
    # 检查键是否包含数组索引模式
    array_index_pattern = re.compile(r'\.\d+\.')
    if array_index_pattern.search(key):
        # 替换索引为通配符
        dynamic_key = array_index_pattern.sub(r'.[0-9]+.', key)
        escaped_dynamic_key = dynamic_key.replace('.', '\\.').replace('[', '\\[').replace(']', '\\]')
        
        try:
            # 使用grep搜索动态键模式
            cmd = ['grep', '-r', '-P', escaped_dynamic_key, '--include=*.ts', '--include=*.tsx', '--include=*.js', '--include=*.jsx'] + search_dirs
            result = subprocess.run(cmd, capture_output=True, text=True)
            
            if result.returncode == 0:
                filtered_results = [line for line in result.stdout.split('\n') if line and 'locales/' not in line]
                if filtered_results:
                    return True
        except Exception as e:
            # grep -P 可能不支持，尝试使用普通的模式
            try:
                base_pattern = key.split('.')[0]
                cmd = ['grep', '-r', f"'{base_pattern}'", '--include=*.ts', '--include=*.tsx', '--include=*.js', '--include=*.jsx'] + search_dirs
                result = subprocess.run(cmd, capture_output=True, text=True)
                
                if result.returncode == 0:
                    filtered_results = [line for line in result.stdout.split('\n') if line and 'locales/' not in line]
                    if filtered_results:
                        # 手动检查是否有循环遍历
                        for line in filtered_results:
                            if 'map(' in line or 'forEach(' in line or 'for (' in line:
                                return True
            except Exception as e2:
                print(f"检查动态键 '{key}' 时出错: {e2}")
    
    return False

def is_key_used(key, search_dirs):
    """检查键是否在代码库中使用"""
    # 如果是数组中的项，检查动态索引用法
    if re.search(r'\.\d+\.', key):
        if check_dynamic_array_keys(key, search_dirs):
            return True
    
    # 获取所有可能的键变体
    key_variations = generate_key_variations(key)
    
    # 先检查完整键是否直接在代码中使用
    if search_key_in_codebase(key, search_dirs):
        return True
    
    # 获取命名空间部分（除了最后一部分）
    parts = key.split('.')
    namespace = '.'.join(parts[:-1]) if len(parts) > 1 else None
    
    if namespace:
        # 查找使用该命名空间的文件
        namespace_files = find_files_with_namespace(namespace, search_dirs)
        
        # 在这些文件中搜索最后一部分键
        if namespace_files and search_key_in_namespace_files(key, namespace_files):
            return True
    
    # 依次检查其他变体
    for variation in key_variations[1:]:  # 跳过第一个，因为已经检查过了
        if search_key_in_codebase(variation, search_dirs):
            return True
    
    # 处理特殊情况：API 响应中的错误键可能不使用 t() 函数
    if key.startswith('errors.'):
        # 去掉errors.前缀，检查直接使用的情况
        error_key = key[7:]  # 移除 "errors." 前缀
        if search_key_in_codebase(error_key, search_dirs):
            return True
    
    return False

def delete_key_from_json(data, key):
    """从JSON数据中删除指定的键"""
    keys = key.split('.')
    
    # 递归删除函数
    def _delete_nested(d, keys):
        if len(keys) == 1:
            if keys[0] in d:
                del d[keys[0]]
                return True
            return False
        else:
            if keys[0] in d and isinstance(d[keys[0]], dict):
                result = _delete_nested(d[keys[0]], keys[1:])
                # 如果父对象为空，也删除它
                if result and not d[keys[0]]:
                    del d[keys[0]]
                return result
            return False
    
    return _delete_nested(data, keys)

def prune_empty_objects(data):
    """递归删除空对象"""
    if not isinstance(data, dict):
        return

    # 使用列表保存需要删除的键
    keys_to_delete = []
    
    for k, v in data.items():
        if isinstance(v, dict):
            # 递归处理子对象
            prune_empty_objects(v)
            # 如果处理后子对象为空，标记为删除
            if not v:
                keys_to_delete.append(k)
    
    # 删除空对象
    for k in keys_to_delete:
        del data[k]

def clean_translation_file(file_path, unused_keys):
    """从翻译文件中删除未使用的键"""
    # 读取当前的翻译数据
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            translations = json.load(f)
        
        # 记录删除的键
        deleted_keys = []
        
        # 删除未使用的键
        for key in unused_keys:
            if delete_key_from_json(translations, key):
                deleted_keys.append(key)
        
        # 清理空对象
        prune_empty_objects(translations)
        
        # 写回文件
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(translations, f, indent=2, ensure_ascii=False)
        
        return deleted_keys
    except Exception as e:
        print(f"清理翻译文件时出错: {e}")
        return []

def backup_file(file_path):
    """备份文件"""
    backup_path = f"{file_path}.bak"
    try:
        import shutil
        shutil.copy2(file_path, backup_path)
        print(f"已创建备份文件: {backup_path}")
        return True
    except Exception as e:
        print(f"备份文件时出错: {e}")
        return False

def parse_args():
    """解析命令行参数"""
    parser = argparse.ArgumentParser(description='查找并删除未使用的翻译键')
    parser.add_argument('-y', '--yes', action='store_true', help='自动模式，无需确认直接删除未使用的键')
    parser.add_argument('--no-backup', action='store_true', help='跳过备份步骤')
    parser.add_argument('--dry-run', action='store_true', help='仅显示将要删除的键，不实际删除')
    return parser.parse_args()

def main():
    # 解析命令行参数
    args = parse_args()
    
    # 获取项目根目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(os.path.dirname(script_dir))
    
    # 翻译文件路径
    translation_file = os.path.join(project_root, 'src', 'locales', 'zh.json')
    
    # 需要搜索的目录
    search_dirs = [os.path.join(project_root, 'src')]
    
    # 加载翻译文件
    translations = load_translation_file(translation_file)
    
    # 获取所有翻译键
    all_keys = get_all_keys(translations)
    print(f"总共找到 {len(all_keys)} 个翻译键")
    
    # 查找未使用的键
    unused_keys = []
    total_keys = len(all_keys)
    
    for index, key in enumerate(all_keys):
        # 显示进度
        if (index + 1) % 50 == 0 or index == total_keys - 1:
            print(f"处理进度: {index + 1}/{total_keys}")
        
        if not is_key_used(key, search_dirs):
            unused_keys.append(key)
    
    # 输出结果
    print("\n未使用的翻译键:")
    print("====================")
    if not unused_keys:
        print("没有找到未使用的翻译键")
        return
    else:
        print(f"找到 {len(unused_keys)} 个未使用的翻译键:")
        for key in unused_keys:
            print(key)
        
        # 保存结果到文件
        # output_file = os.path.join(project_root, 'unused-translations.json')
        # with open(output_file, 'w', encoding='utf-8') as f:
        #     json.dump(unused_keys, f, indent=2, ensure_ascii=False)
        # print(f"\n未使用的翻译键已保存到: {output_file}")
    
    # 如果是干运行模式，直接返回
    if args.dry_run:
        print("\n干运行模式：不会实际删除任何键")
        return
    
    # 询问是否从翻译文件中删除这些键
    should_delete = args.yes
    if not should_delete:
        while True:
            response = input("\n是否要从翻译文件中删除这些未使用的键? (y/n): ").lower().strip()
            if response in ('y', 'yes', 'n', 'no'):
                should_delete = response in ('y', 'yes')
                break
            print("请输入 y 或 n")
    
    if should_delete:
        # 备份文件（除非指定不备份）
        if args.no_backup or backup_file(translation_file):
            # 删除未使用的键
            deleted_keys = clean_translation_file(translation_file, unused_keys)
            
            print(f"\n已从翻译文件中删除 {len(deleted_keys)} 个未使用的键")
            print(f"翻译文件已更新: {translation_file}")
        else:
            print("由于备份失败，未对翻译文件进行修改")

if __name__ == "__main__":
    main() 