$directories = "Faq", "bar", "invoices", "chart", "line", "faq", "form", "geography", "contact"

$directories | ForEach-Object {
    $directoryPath = Join-Path -Path $PWD -ChildPath $_
    New-Item -ItemType Directory -Path $directoryPath
}