if ($args.Count -lt 2) {
    Write-Output "[-]Usage requires more than one argumnets"
    exit 1
}

# path
$path = $args[0]
for ($i = 1; $i -lt $args.Count; $i++) {
    $subDirectoryPath = Join-Path -Path $path -ChildPath $args[$i]
     New-Item -ItemType Directory -Path $subDirectoryPath
}